"use client";

import { Heart, User2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SwipeCardAction from "./SwipeCardAction";
import { useRouter } from "next/navigation";
import { createMessageRequest } from "@/lib/actions/message.actions";
import { useUserStore } from "@/providers/user.provider";

interface SwipeCardI {
  fullName: string;
  Age: () => string;
  bio: string;
  id: string;
  profilePictures: string[];
  isOpaque: boolean;
  incrementIdx: any;
}

const SwipeCard = ({
  profilePictures,
  fullName,
  Age,
  bio,
  id,
  isOpaque,
  incrementIdx,
}: SwipeCardI) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useUserStore((state) => state);

  const handlesmash = async () => {
    try {
      await createMessageRequest(
        user!.id,
        id,
        `${fullName}, you were sent a message request and want to connect`
      );
      incrementIdx();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        isOpaque ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } bg-gray-700 absolute w-[95%] max-w-lg md:w-[450px] h-[90vh] md:h-[570px] transition-transform duration-300 rounded-xl shadow-lg overflow-hidden`}
    >
      {/* Image Display */}
      <div className="relative w-full h-3/4 overflow-hidden">
        <Image
          src={profilePictures[currentImage]}
          alt={`${fullName} profile picture`}
          className="object-cover w-full h-full"
          fill
        />
        <div className="absolute top-2 left-2 flex gap-1 w-[90%] h-2">
          {profilePictures.map((_, i) => (
            <div
              key={i}
              className={`${
                currentImage === i ? "bg-white" : "bg-gray-500"
              } rounded-full flex-1 h-full transition-all duration-200 cursor-pointer`}
              onClick={() => setCurrentImage(i)}
            />
          ))}
        </div>
      </div>

      {/* Profile Details */}
      <div className="relative bg-gradient-to-t from-gray-900 via-transparent to-transparent px-6 pt-4 pb-6 flex flex-col items-center space-y-3 text-center text-white">
        <h1 className="text-2xl font-semibold">
          {fullName}, <span className="font-medium text-lg">{Age()}</span>
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">{bio}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <SwipeCardAction
            onclick={() => incrementIdx()}
            desc="Pass"
            Icon={X}
            fill="bg-red-500"
            color="white"
            className="hover:scale-105 transition-transform duration-200"
          />
          <SwipeCardAction
            onclick={handlesmash}
            desc="Smash"
            Icon={Heart}
            fill="bg-pink-500"
            color="white"
            className="hover:scale-105 transition-transform duration-200"
          />
          <SwipeCardAction
            onclick={() => router.push(`dashboard/profile/${id}`)}
            desc="Profile"
            Icon={User2}
            fill="bg-green-500"
            color="white"
            className="hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
