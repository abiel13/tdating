"use client";
import NotFound from "@/components/NotFound";
import {
  getUserMessageRequest,
  updateMessageReqStatus,
} from "@/lib/actions/message.actions";
import { useUserStore } from "@/providers/user.provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messageReq, setMessageReq] = useState<any[]>([]);
  const { user } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [ref, setref] = useState(false);

  const handleclick = async (
    id: string,
    status: "Pending" | "Rejected" | "Accepted",
    toUserId: string,
    fromUserId: string
  ) => {
    try {
      const updateReq = await updateMessageReqStatus(
        id,
        status,
        fromUserId,
        toUserId
      );
      console.log(updateReq);
      // const smashed

      if (updateReq) {
        setref((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const response = await getUserMessageRequest(user!.id);
        setMessageReq(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, ref]);

  if (loading)
    return (
      <div className="text-white font-bold text-xl text-center w-full h-screen">
        please wait loading...
      </div>
    );

  return (
    <div className=" min-h-screen md:h-full w-full flex flex-col items-center px-2 py-3">
      {messageReq?.length > 0 ? (
        <div className="flex flex-col gap-5 w-full min-h-full">
          {messageReq.map((item, i) => {
            return (
              <div
                key={i}
                className="w-full min-h-[150px] 
                bg-white/40 px-2 py-2 rounded-lg flex flex-col gap-1"
              >
                <h3 className="text-white capitalize font-medium  font-sans text-lg">
                  {item.fromUserId.fullName}
                </h3>
                <p className="text-white">{item.message}</p>
                <div className="mt-3 flex items-center gap-4">
                  <Link
                    className="bg-blue-500 rounded-lg px-5 py-2 text-white w-fit "
                    href={`/dashboard/profile/${item.fromUserId._id}`}
                  >
                    Visit Profile
                  </Link>

                  <button
                    className="px-6 text-white font-medium tracking-wide py-2 rounded-lg bg-green-600"
                    onClick={() =>
                      handleclick(
                        item._id,
                        "Accepted",
                        item.toUserId._id,
                        item.fromUserId._id
                      )
                    }
                  >
                    Smash
                  </button>
                  <button
                    className="px-6 text-white font-medium tracking-wide py-2 rounded-lg bg-red-400"
                    onClick={() =>
                      handleclick(
                        item._id,
                        "Rejected",
                        item.toUserId._id,
                        item.fromUserId._id
                      )
                    }
                  >
                    Pass
                  </button>
                </div>
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
