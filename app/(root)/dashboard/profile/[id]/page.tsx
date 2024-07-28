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
      fullName: "KTovew we",
      bio: " A 25-year-old financial analyst from Chicago. He's passionate about cooking gourmet meals and traveling to new countries to experience different cuisines.",
      dateOfBirth: new Date("2001-01-03T23:00:00.000Z"),
      username: "de334sas",
      gender: "Male",
      profilePictures: [
        "https://i.pinimg.com/236x/90/05/7c/90057c033320cf6064a60888c591be08.jpg",
        "https://i.pinimg.com/236x/29/56/e0/2956e0ce8ba5f2d8e64b6ba72a47ef84.jpg",
        "https://i.pinimg.com/236x/a5/d7/08/a5d708d7d77d7a02a39361ba429236c3.jpg",
        "https://i.pinimg.com/236x/8e/eb/33/8eeb33e64bd0139d9cd97a0a7148b9e9.jpg",
      ],
      interests: ["Dancing", "Singing", "Photography"],
      telegramChatId: "6578909865",
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
        </div>
      )}
    </>
  );
};

export default UserProfile;
