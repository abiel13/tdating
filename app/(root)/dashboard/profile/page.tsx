"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useratom } from "@/lib/atoms/user.atoms";
import { getuserById, getuserName } from "@/lib/actions/user.actions";

const UserProfile = () => {


  useEffect(() => {
    (async function () {
      const data = await getuserName("abiqwel");
      console.log(data);
    })();
  }, []);

  return (
    <div className="min-h-screen w-full  px-6 py-4">
      <div className="flex-col flex gap-4  my-4">
        <h1 className="text-white font-bold text-xl font-sans">User Profile</h1>
        <Separator className="bg-gray-500" />
      </div>

      {/* profile header */}
      <div className="min-h-[30vh] flex items-center gap-10">
        <div className="h-[200px] w-[200px] relative">
          <Image
            src={"/assets/avatar3.jpeg"}
            alt="user_profile image"
            fill
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col items-start gap-4 self-start">
          <h3 className="font-bold text-white font-sans">Allison Parker</h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
