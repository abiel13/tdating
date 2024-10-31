"use client";

import NotFound from "@/components/NotFound";
import { getUserSentMessageRequest } from "@/lib/actions/message.actions";
import { useUserStore } from "@/providers/user.provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SentMessages = () => {
  const [messageReq, setMessageReq] = useState<any[]>([]);
  const { user } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    (async function () {
      try {
        setLoading(true);
        const response = await getUserSentMessageRequest(user!.id);
        setMessageReq(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading)
    return (
      <div className="text-white font-bold text-xl text-center w-full min-h-screen">
        Please wait, loading...
      </div>
    );

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-6 bg-gradient-to-b from-gray-800 to-gray-900">
      {messageReq?.length > 0 ? (
        <div className="flex flex-col gap-6 w-full max-w-3xl">
          {messageReq.map((item, i) => {
            return (
              <div key={i}>
                {item.status === "Pending" && (
                  <div className="bg-gray-700/40 w-full p-5 rounded-lg shadow-lg transition-all hover:bg-gray-700/60">
                    <h2 className="font-bold text-xl tracking-wide text-white mb-2">
                      You sent a message request to {item.toUserId.fullName}
                    </h2>
                    <div className="flex gap-4">
                      <button
                        disabled
                        className="px-5 py-2 rounded-full bg-gray-600 text-white font-semibold tracking-wide"
                      >
                        {item.status}
                      </button>
                      <button className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all">
                        Retrieve
                      </button>
                    </div>
                  </div>
                )}
                {item.status === "Accepted" && (
                  <div className="bg-green-600/30 w-full p-5 rounded-lg shadow-lg transition-all hover:bg-green-600/40">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {item.toUserId.fullName} has accepted your message request
                    </h3>
                    <p className="text-gray-200">
                      You can message them here:{" "}
                      <Link
                        href={`https://t.me/${item.toUserId.username}`}
                        className="text-blue-300 underline"
                      >
                        {`https://t.me/${item.toUserId.username}`}
                      </Link>
                    </p>
                  </div>
                )}
                {item.status === "Rejected" && (
                  <div className="bg-red-500/30 w-full p-5 rounded-lg shadow-lg transition-all hover:bg-red-500/40">
                    <h3 className="font-bold text-lg text-red-400 mb-2">
                      Rejected Message Request
                    </h3>
                    <p className="text-gray-200">
                      Unfortunately, {item.toUserId.fullName} has rejected your
                      message request.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound
          title="No Message Request Found"
          desc="Try updating your profile to get more views and message requests."
        />
      )}
    </div>
  );
};

export default SentMessages;
