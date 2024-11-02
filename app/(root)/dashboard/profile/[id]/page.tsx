"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { createUser, getuserById } from "@/lib/actions/user.actions";
import { useUserStore } from "@/providers/user.provider";
import { useParams } from "next/navigation";
import { User } from "@/lib/store/user.store";
import Logo from "@/components/Logo";
import { Circles } from "react-loader-spinner";
import ProfileHeader from "@/components/ProfileHeader";
import ProfilePhotoDisplay from "@/components/ProfilePhotoDisplay";
import Slider from "@/components/Slider";
import UserPrefrences from "@/components/UserPrefrences";

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
        setUserData(response);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col items-center px-6 py-8">
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Circles color="#4f46e5" />
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {/* Logo and Header */}
          <div className="flex items-center justify-between w-full border-b border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <Logo />
              <h1 className="text-2xl font-semibold">User Profile</h1>
            </div>
          </div>

          {/* Profile Header */}
          <ProfileHeader userData={userData} />

          {/* Profile Photo */}
          <ProfilePhotoDisplay userData={userData} />

          {/* User Preferences */}
          {isMe && (
          <UserPrefrences />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
