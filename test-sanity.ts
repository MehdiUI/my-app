// test-sanity.ts
import { backendClient } from "@/sanity/lib/backendClient";

async function test() {
  try {
    const result = await backendClient.create({
      _type: "order",
      orderNumber: "TEST-123",
      customerName: "Test User",
      email: "test@test.com",
      stripeCustomerId: "test",
      stripePaymentIntentId: "test",
      currency: "USD",
      totalPrice: 10,
      amountDiscount: 0,
      status: "paid",
      orderDate: new Date().toISOString(),
      products: []
    });
    console.log("✅ Test réussi:", result);
  } catch (error) {
    console.error("❌ Test échoué:", error);
  }
}

test();