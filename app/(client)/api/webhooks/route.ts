import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/client"; 
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'

interface OrderData {
  _type: string;
  orderNumber: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string; // ← AJOUT DE CETTE PROPRIÉTÉ MANQUANTE
  customerName: string;
  stripeCustomerId: string;
  email: string;
  currency: string;
  amountDiscount: number;
  products: Array<{
    _key: string;
    product: {
      _type: string;
      _ref: string;
    };
    quantity: number;
  }>;
  totalPrice: number;
  status: string;
  orderDate: string;
  clerkUserId?: string;
  address?: {
    state: string;
    zip: string;
    city: string;
    address: string;
    name: string;
  };
}

export async function POST(req: NextRequest) {
  console.log("🔔 Webhook received at:", new Date().toISOString());
  
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    console.error("❌ No signature found");
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("✅ Event constructed successfully:", event.type);
  } catch (error) {
    console.error("❌ Webhook construction error:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    console.log("💰 Processing checkout.session.completed");
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      const order = await createOrderInSanity(session);
      console.log("✅ Order created successfully:", order._id);
    } catch (error) {
      console.error("❌ Error creating order:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  console.log("📝 Creating order in Sanity for session:", session.id);
  
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
    customer,
    customer_details,
  } = session;
  
  console.log("📦 Metadata received:", metadata);
  
  // Vérification critique des métadonnées
  if (!metadata?.orderNumber || !metadata?.customerName || !metadata?.customerEmail) {
    console.error("❌ Missing required metadata:", {
      orderNumber: metadata?.orderNumber,
      customerName: metadata?.customerName,
      customerEmail: metadata?.customerEmail
    });
    throw new Error("Missing required metadata in session");
  }

  const { orderNumber, customerName, customerEmail, clerkUserId, address } = metadata;
  
  let parsedAddress = null;
  try {
    parsedAddress = address ? JSON.parse(address) : null;
  } catch (error) {
    console.warn("⚠️ Failed to parse address:", error);
  }

  // Récupérer les line items
  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"]
  });

  console.log("🛒 Line items count:", lineItems.data.length);

  // Créer les références produits Sanity
  const sanityProducts: OrderData["products"] = [];
  const stockUpdates: { productId: string; quantity: number }[] = [];
  
  for (const item of lineItems.data) {
    const product = item.price?.product as Stripe.Product;
    const productId = product?.metadata?.sanityId || product?.metadata?.id;
    const quantity = item.quantity || 0;

    if (!productId) {
      console.warn("⚠️ Product without ID found:", product?.id, "metadata:", product?.metadata);
      continue;
    }

    const randomKey = Math.random().toString(36).substring(2, 15);
    
    sanityProducts.push({
      _key: randomKey,
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });
    
    stockUpdates.push({ productId, quantity });
  }

  console.log("📦 Products to create:", sanityProducts.length);

  // Customer ID
  const customerId = typeof customer === 'string' ? customer : customer?.id;
  const finalCustomerEmail = customer_details?.email || customerEmail;

  // Créer l'objet order
  const orderData: OrderData = {
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent as string, // ← CETTE PROPRIÉTÉ EST MAINTENANT DÉFINIE DANS L'INTERFACE
    customerName,
    stripeCustomerId: customerId || `email_${finalCustomerEmail}`,
    email: finalCustomerEmail,
    currency: currency?.toUpperCase() || "EUR",
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  };

  // Ajouter clerkUserId si disponible
  if (clerkUserId && clerkUserId !== "undefined") {
    console.log("👤 Adding clerkUserId:", clerkUserId);
    orderData.clerkUserId = clerkUserId;
  }

  // Ajouter l'adresse si disponible
  if (parsedAddress) {
    console.log("📍 Adding address data");
    orderData.address = {
      state: parsedAddress.state || "",
      zip: parsedAddress.zip || "",
      city: parsedAddress.city || "",
      address: parsedAddress.address || "",
      name: parsedAddress.name || customerName,
    };
  }
  
  console.log("💾 Attempting to create order in Sanity...");
  
  try {
    // Vérifier la configuration Sanity
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error("SANITY_API_TOKEN is not set");
    }
    
    console.log("🔧 Sanity project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    
    const order = await backendClient.create(orderData);
    console.log("✅ Order created in Sanity:", order._id);

    // Mettre à jour les stocks
    if (stockUpdates.length > 0) {
      console.log("📊 Updating stock levels...");
      await updateStockLevels(stockUpdates);
    }

    return order;
  } catch (createError) {
    console.error("❌ Failed to create order in Sanity:", createError);
    throw createError;
  }
}

async function updateStockLevels(stockUpdates: { productId: string; quantity: number }[]) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      const product = await backendClient.getDocument(productId);
      
      if (!product) {
        console.warn(`⚠️ Product ${productId} not found`);
        continue;
      }

      const currentStock = product.stock || 0;
      const newStock = Math.max(currentStock - quantity, 0);
      
      await backendClient
        .patch(productId)
        .set({ stock: newStock })
        .commit();
        
      console.log(`✅ Stock updated for ${productId}: ${currentStock} → ${newStock}`);
    } catch (error) {
      console.error(`❌ Failed to update stock for ${productId}:`, error);
    }
  }
}