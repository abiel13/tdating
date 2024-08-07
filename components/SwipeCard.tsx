"use client";

import {
  Heart,
  HeartPulse,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SwipeCardAction from "./SwipeCardAction";
import { useRouter } from "next/navigation";

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
  return (
    <div
      id="test-card"
      className={` ${
        isOpaque ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } bg-gray-600 absolute md:w-[450px] transition-all ease-in-out duration-300 w-[97%] md:h-[570px] h-[90vh]  rounded-t-xl `}
    >
      <div className="relative w-full h-[100%] md:h-[100%]">
        <Image
          src={profilePictures[currentImage]}
          alt="image"
          className="object-cover rounded-t-xl pointer-events-none"
          fill
        />
      </div>{" "}
      <div className="absolute -bottom-3 w-full z-10 bg-black/80  px-3">
        <h1 className="text-white font-semibold text-3xl">
          {fullName} <span className="font-medium">{Age()}</span>
        </h1>
        <p className="text-gray-400 capitalize text-lg">{bio}</p>

        <div className="flex flex-row  justify-center gap-2 mt-8">
          <SwipeCardAction
            onclick={() => incrementIdx()}
            desc="Pass"
            Icon={X}
            fill="border-[#ffaaed]"
            color="#ffaaed"
          />
          <SwipeCardAction
            desc="Smash"
            Icon={Heart}
            fill="border-[#9a9aff]"
            color="#9a9aff"
          />
   
          <SwipeCardAction
            onclick={() => router.push(`dashboard/profile/${id}`)}
            desc="Profile"
            Icon={User2}
            fill="border-[#afffaf]"
            color="#afffaf"
          />
        </div>
      </div>
      <div className="w-full h-[10px] absolute top-2 flex px-2 gap-1">
        {profilePictures.map((item, i) => {
          const active = currentImage === i;
          return (
            <div
              key={i}
              className={` ${
                active ? "bg-white" : "bg-gray-800/70"
              }  border border-white  flex-1 rounded-xl`}
              onClick={() => setCurrentImage(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwipeCard;
