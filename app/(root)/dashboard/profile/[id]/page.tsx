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

  async function createDemoUsers() {
    const data = {
      fullName: "German tuprit",
      bio: "love  juice world 999 . lost and confused . dare devil droplet saddist",
      dateOfBirth: new Date("2003-01-03T23:00:00.000Z"),
      username: "liviewa",
      gender: "Female",
      profilePictures: [
        "https://i.pinimg.com/236x/92/cd/64/92cd64a7a5400944da93f94e8fef9327.jpg",
        "https://i.pinimg.com/236x/be/2e/88/be2e881e43a101a22190d5ed7718b38f.jpg",
        "https://i.pinimg.com/236x/df/76/82/df7682b51ecf82aa7d7c11f810702822.jpg",
      ],
      interests: ["Reading", "Writing", "Camping"],
      telegramChatId: "477389212",
      location: {
        type: "Point",
        coordinates: [4.8365521, 6.9609754],
      },
    };

    try {
      const response = await createUser({ ...data });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className="h-full flex items-center justify-center w-full">
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
          <button onClick={() => createDemoUsers()}>create new user</button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
