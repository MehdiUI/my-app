import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// IMPORTANT: Configuration pour Next.js 16
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
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
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
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
    customer,
  } = session;
  
  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata as unknown as Metadata & { address: string };
  
  const parsedAddress = address ? JSON.parse(address) : null;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  // Create Sanity product references and prepare stock updates
  const sanityProducts: OrderData["products"] = [];
  const stockUpdates: { productId: string; quantity: number }[] = [];
  
  for (const item of lineItemsWithProduct.data) {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if (!productId) {
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
    orderData.clerkUserId = clerkUserId;
  }

  // Ajouter l'invoice si elle existe
  if (invoice) {
    orderData.invoice = {
      id: invoice.id,
      number: invoice.number ?? null,
      hosted_invoice_url: invoice.hosted_invoice_url ?? null,
    };
  }

  // Ajouter l'adresse si elle existe
  if (parsedAddress) {
    orderData.address = {
      state: parsedAddress.state || "",
      zip: parsedAddress.zip || "",
      city: parsedAddress.city || "",
      address: parsedAddress.address || "",
      name: parsedAddress.name || "",
    };
  }
  
  try {
    const order = await backendClient.create(orderData);

    // Update stock levels in Sanity
    await updateStockLevels(stockUpdates);

    return order;
  } catch (createError) {
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
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);

      // Update stock in Sanity
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch {
      // Silent fail for stock updates
    }
  }
}