"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  createUser,
  getuserById,
  getuserName,
} from "@/lib/actions/user.actions";
import { useUserStore } from "@/providers/user.provider";
import { useParams } from "next/navigation";
import { User } from "@/lib/store/user.store";
import Logo from "@/components/Logo";
import { calculateAge } from "@/lib/utils/utils";
import { Circles } from "react-loader-spinner";
import ProfileHeader from "@/components/ProfileHeader";
import ProfilePhotoDisplay from "@/components/ProfilePhotoDisplay";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const isMe = id === user?.id;


  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await getuserById(id as string);
        console.log(response);
        setUserData(response);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className=" flex items-center justify-center w-full h-screen">
          <Circles />
        </div>
      ) : (
        <div className="min-h-screen w-full  px-6 py-4">
          <div className="flex-col flex gap-4  my-4">
            <h1 className="text-white font-bold text-xl font-sans">
              <Logo /> User Profile
            </h1>
            <Separator className="bg-gray-500" />
          </div>

          {/* profile header */}
          <ProfileHeader userData={userData} />
          <Separator className="mt-8 bg-gray-400" />
          <ProfilePhotoDisplay userData={userData} />

          {isMe && <div>user prefrences</div>}
        </div>
      )}
    </>
  );
};

export default UserProfile;
