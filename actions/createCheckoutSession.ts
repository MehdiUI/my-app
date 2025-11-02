"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    // Préparer les line_items avec validation
    const lineItems = items.map((item) => {
      // Vérifier que le produit et le prix existent
      if (!item.product) {
        throw new Error("Product is missing");
      }
      const price = item.product.price;
      if (price == null) {
        throw new Error(`Product ${item.product.name} does not have a price`);
      }

      return {
        price_data: {
          currency: "USD",
          unit_amount: Math.round(price * 100), // price est maintenant non-null
          product_data: {
            name: item.product.name || "Unknown Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images: item.product.images && item.product.images.length > 0
              ? [urlFor(item.product.images[0]).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      };
    });

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        ...(metadata.clerkUserId && { clerkUserId: metadata.clerkUserId }),
        address: metadata.address ? JSON.stringify(metadata.address) : "",
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: lineItems,
    };

    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}