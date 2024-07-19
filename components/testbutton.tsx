"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const RouteButton = () => {
  const router = useRouter();
  return (
    <button
      className="text-white font-bold text-lg bg-blue-400 rounded-xl px-3 py-4"
      onClick={() => router.push("/dashboard")}
    >
      routing
    </button>
  );
};

const Testbutton = () => {
  return (
    <button
      className="text-white font-bold text-lg bg-blue-400 rounded-xl px-3 py-4"
      onClick={() => {
        document.cookie = `testing=${JSON.stringify({ abiel: "test-bitch" })}`; // Ensure the user object is serialized to JSON string
      }}
    >
      test cookie working
    </button>
  );
};

export default Testbutton;
