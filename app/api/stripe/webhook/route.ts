import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {
  const subscription = event.data.object as Stripe.Subscription;

  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData: any = {
    subscription_id: subscription.id,
    stripe_user_id: subscription.customer,
    status: subscription.status,
    start_date: new Date(subscription.created * 1000).toISOString(),
    plan_id: subscription.items.data[0]?.price.id,
    user_id: subscription.metadata?.userId || "",
    email: customerEmail,
  };

  console.log(subscriptionData);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  console.log(body);

  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return;
  }

  const endpointSecret =
    "whsec_765b34dc6ddee18a9eb78820042356d0bddf63cf352e8928d0b5013ec12d7c85";

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log("err");

    return NextResponse.json({ error: err });
  }

  switch (event.type) {
    case "customer.subscription.created":
      const paymentIntentSucceeded = event.data.object;
    case "customer.subscription.updated":
      return handleSubscriptionEvent(event, "updated");
    case "customer.subscription.deleted":
      return handleSubscriptionEvent(event, "deleted");
      console.log(paymentIntentSucceeded);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
