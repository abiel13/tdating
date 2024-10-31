"use client";

import { getUserMessageRequest, updateMessageReqStatus } from "@/lib/actions/message.actions";
import { useUserStore } from "@/providers/user.provider";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader, UserX, UserCheck } from "lucide-react"; // Example icons

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
      if (updateReq) {
        setref((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    (async function () {
      try {
        setLoading(true);
        const response = await getUserMessageRequest(user!.id);
        setMessageReq(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, ref]);

  if (loading)
    return (
      <div className="text-white font-bold text-lg text-center w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-black">
        <Loader className="animate-spin text-purple-400" size={50} />
      </div>
    );

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4  text-white">
      {messageReq?.length > 0 ? (
        <div className="flex flex-col gap-6 w-full max-w-3xl">
          {messageReq.map((item, i) => (
            <div
              key={i}
              className="w-full bg-gradient-to-r from-[#120f20] to-[#010929] bg-opacity-90 backdrop-blur-md p-5 rounded-3xl shadow-lg transform transition hover:scale-[1.02] hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold mb-1">{item.fromUserId.fullName}</h3>
              <p className="text-gray-300 text-base mb-4">{item.message}</p>
              <div className="flex gap-4 flex-wrap items-center">
                <Link
                  href={`/dashboard/profile/${item.fromUserId._id}`}
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition-all transform hover:scale-105"
                >
                  <span className="mr-2">Profile</span> <UserCheck size={20} />
                </Link>
                <button
                  onClick={() =>
                    handleclick(
                      item._id,
                      "Accepted",
                      item.toUserId._id,
                      item.fromUserId._id
                    )
                  }
                  className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition-all transform hover:scale-105"
                >
                  <span className="mr-2">Accept</span> <UserCheck size={20} />
                </button>
                <button
                  onClick={() =>
                    handleclick(
                      item._id,
                      "Rejected",
                      item.toUserId._id,
                      item.fromUserId._id
                    )
                  }
                  className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full transition-all transform hover:scale-105"
                >
                  <span className="mr-2">Decline</span> <UserX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 py-12">
          <Image
            src="/assets/notfound.png"
            alt="Not Found"
            width={250}
            height={250}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-white">No Messages Found</h1>
          <p className="text-gray-400 text-center">
            It looks like you don’t have any messages at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
