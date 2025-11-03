import { Metadata } from "@/actions/createCheckoutSession";
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
  stripePaymentIntentId: string;
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
  invoice?: {
    id: string;
    number: string | null;
    hosted_invoice_url: string | null;
  };
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
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      const order = await createOrderInSanity(session, invoice);
      console.log("✅ Order created successfully:", order._id);
    } catch (error) {
      console.error("❌ Error creating order:", error);
      // Log plus de détails sur l'erreur
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  console.log("📝 Creating order in Sanity for session:", session.id);
  
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
    customer,
  } = session;
  
  console.log("📦 Metadata received:", metadata);
  
  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata as unknown as Metadata & { address: string };
  
  const parsedAddress = address ? JSON.parse(address) : null;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  console.log("🛒 Line items count:", lineItemsWithProduct.data.length);

  // Create Sanity product references and prepare stock updates
  const sanityProducts: OrderData["products"] = [];
  const stockUpdates: { productId: string; quantity: number }[] = [];
  
  for (const item of lineItemsWithProduct.data) {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if (!productId) {
      console.warn("⚠️ Product without ID found, skipping");
      continue;
    }

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });
    stockUpdates.push({ productId, quantity });
  }

  console.log("📦 Products to create:", sanityProducts.length);

  // Récupérer le customer ID Stripe
  const customerId = typeof customer === 'string' ? customer : customer?.id || customerEmail;

  // Créer l'objet order avec les champs requis
  const orderData: OrderData = {
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent as string,
    customerName,
    stripeCustomerId: customerId,
    email: customerEmail,
    currency: currency?.toUpperCase() || "USD",
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  };

  // ✅ Ajouter clerkUserId seulement s'il existe
  if (clerkUserId) {
    console.log("👤 Adding clerkUserId:", clerkUserId);
    orderData.clerkUserId = clerkUserId;
  } else {
    console.log("⚠️ No clerkUserId provided");
  }

  // Ajouter l'invoice si elle existe
  if (invoice) {
    console.log("🧾 Adding invoice data");
    orderData.invoice = {
      id: invoice.id,
      number: invoice.number ?? null,
      hosted_invoice_url: invoice.hosted_invoice_url ?? null,
    };
  }

  // Ajouter l'adresse si elle existe
  if (parsedAddress) {
    console.log("📍 Adding address data");
    orderData.address = {
      state: parsedAddress.state || "",
      zip: parsedAddress.zip || "",
      city: parsedAddress.city || "",
      address: parsedAddress.address || "",
      name: parsedAddress.name || "",
    };
  }
  
  console.log("💾 Attempting to create order in Sanity...");
  
  try {
    // Vérifier que le token Sanity existe
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error("SANITY_API_TOKEN is not set");
    }
    
    const order = await backendClient.create(orderData);
    console.log("✅ Order created in Sanity:", order._id);

    // Update stock levels in Sanity
    console.log("📊 Updating stock levels...");
    await updateStockLevels(stockUpdates);
    console.log("✅ Stock levels updated");

    return order;
  } catch (createError) {
    console.error("❌ Failed to create order in Sanity:", createError);
    throw createError;
  }
}

// Function to update stock levels
async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      // Fetch current stock
      const product = await backendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(`⚠️ Product ${productId} not found or has no stock field`);
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);

      // Update stock in Sanity
      await backendClient.patch(productId).set({ stock: newStock }).commit();
      console.log(`✅ Stock updated for ${productId}: ${product.stock} → ${newStock}`);
    } catch (error) {
      console.error(`❌ Failed to update stock for ${productId}:`, error);
      // Silent fail for stock updates
    }
  }
}