"use client";
import React from "react";
import { createSession } from "@/lib/actions/stripe.actions";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

// Mock subscription data
const subscriptionPlans = [
  {
    id: 0,
    title: "Free Plan",
    line_item: {
      price_data: {
        currency: "usd",
        product_data: { name: "Free Plan" },
        unit_amount: 0.0,
        tax_behavior: "exclusive",
      },
      quantity: 1,
    },
    features: [
      "Access to Basic features",
      "Limited matches",
      "Limited distance search",
    ],
  },
  {
    id: 1,
    title: "Monthly Plan",
    line_item: {
      price_data: {
        currency: "usd",
        product_data: { name: "Monthly FlirtGram Plan" },
        recurring: { interval: "month", interval_count: 1 },
        unit_amount: 100,
        tax_behavior: "exclusive",
      },
      quantity: 1,
    },
    features: ["Access to basic features", "Limited matches", "Monthly updates"],
  },
  {
    id: 2,
    title: "Annual Plan",
    line_item: {
      price_data: {
        currency: "usd",
        product_data: { name: "Annual FlirtGram Plan" },
        recurring: { interval: "year", interval_count: 1 },
        unit_amount: 14400,
        tax_behavior: "exclusive",
      },
      quantity: 1,
    },
    features: [
      "Access to all features",
      "Unlimited matches",
      "Priority support",
      "Weekly updates",
    ],
  },
];

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

const SubscriptionPage = () => {
  const router = useRouter();

  const handleCheckout = async (line_item:any) => {
    try {
      const session = await createSession([line_item]);
      if (session) {
        router.push(session.url!);
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const handleManageSubscription = () => {
    // Replace with actual customer portal URL or a function to create a session for customer portal
    router.push("/manage-subscription");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-[#060218] min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#1b1338] rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              {plan.title}
            </h3>
            <p className="text-2xl font-bold text-white mb-4">
              ${plan.line_item.price_data.unit_amount.toFixed(2)} /{" "}
              {plan.line_item.price_data.recurring?.interval || "one-time"}
            </p>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">
              Features:
            </h4>
            <ul className="list-disc list-inside mb-4 text-gray-400">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(plan.line_item)}
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-2"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Manage Subscription button */}
      <button
        onClick={handleManageSubscription}
        className="mt-8 py-2 px-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
      >
        Manage Subscription
      </button>
    </div>
  );
};

export default SubscriptionPage;
