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
    if (!user) {
      return;
    }
    (async function () {
      try {
        setLoading(true);
        console.log(user);
        const response = await getUserSentMessageRequest(user!.id);
        console.log(response, "response");
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
        please wait loading...
      </div>
    );

  return (
    <div className=" min-h-screen md:h-full w-full flex flex-col items-center px-2 py-3">
      {messageReq?.length > 0 ? (
        <div className="flex flex-col gap-5 w-full min-h-full">
          {messageReq.map((item, i) => {
            return (
              <div key={i}>
                {item.status === "Pending" && (
                  <div className="bg-gray-300/30 w-full min-h-[100px] rounded-lg flex px-3 py-2 flex-col items-start gap-4 ">
                    <h2 className="font-bold text-lg tracking-wide text-white">
                      You Sent a message request to {item.toUserId.fullName}
                    </h2>

                    <div className="flex items-center gap-4">
                      <button
                        disabled
                        className="px-6 text-white font-medium tracking-wide py-2 rounded-lg bg-gray-500/30"
                      >
                        {item.status}
                      </button>
                      <button className="px-6 text-white font-medium tracking-wide py-2 rounded-lg bg-red-400">
                        retrieve
                      </button>
                    </div>
                  </div>
                )}
                {item.status === "Accepted" && (
                  <div className="bg-gray-300/30 w-full min-h-[100px] rounded-lg flex px-3 py-2 flex-col items-start gap-4 ">
                    <h3 className="text-white font-bold text-lg ">
                      {item.toUserId.fullName} has accepted your message request{" "}
                    </h3>
                    <p className="text-gray-200">
                      you can message him using this link :{" "}
                      <Link
                        className="text-blue-400"
                        href={`https://t.me/${item.toUserId.username}`}
                      >
                        {`https://t.me/${item.toUserId.username}`}
                      </Link>{" "}
                    </p>
                  </div>
                )}

                {item.status === "Rejected" && (
                  <div className="bg-gray-300/30 w-full min-h-[100px] rounded-lg flex px-3 py-2 flex-col items-start gap-4 ">
                    <h3 className="text-red-400 font-bold ">
                      {" "}
                      Rejected Message Request
                    </h3>
                    <p className="text-gray-200">
                      Unfortunately, {item.toUserId.fullName} has rejected your
                      message request
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
          desc="try updating your profile to get more views and message request"
        />
      )}
    </div>
  );
};

export default SentMessages;
