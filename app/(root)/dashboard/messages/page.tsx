"use client";
import NotFound from "@/components/NotFound";
import { getUserMessageRequest } from "@/lib/actions/message.actions";
import { useUserStore } from "@/providers/user.provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messageReq, setMessageReq] = useState<any[]>([]);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async function () {
      console.log(user);
      const response = await getUserMessageRequest(user!.id);
      console.log(response);
      setMessageReq(response);
    })();
  }, [user]);

  return (
    <div className=" min-h-screen md:h-full w-full flex flex-col items-center px-2 py-3">
      {messageReq.length > 0 ? (
        <div className="flex flex-col gap-5 w-full min-h-full">
          <h3 className="font-bold text-lg font-sans text-white">Message Request's</h3>
          {messageReq.map((item, i) => {
            return (
              <div
                key={i}
                className="w-full min-h-[150px] bg-white/40 px-2 py-2 rounded-lg flex flex-col gap-1"
              >
                <h3 className="text-white capitalize font-medium  font-sans text-lg">
                  {item.fromUserId.fullName}
                </h3>
                <p className="text-white">{item.message}</p>

                <Link
                  className="bg-blue-500 rounded-lg px-5 py-2 text-white w-fit "
                  href={`/dashboard/profile/${item.fromUserId._id}`}
                >
                  Visit Profile
                </Link>
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

export default Messages;
