"use server";
import stripe from "stripe";

export async function createSession(product: any[]) {
  try {
    const stripeObj = new stripe(process.env.STRIPE_SECRET!);

    const session = await stripeObj.checkout.sessions.create({
      line_items: product,
      mode: "subscription",
      success_url: `http://localhost:3000/dashboard/subscription/success`,
      cancel_url: `http://localhost:3000/dashboard/subscription/cancel`,
    });
console.log(session)
return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.log(error)
  }
}
