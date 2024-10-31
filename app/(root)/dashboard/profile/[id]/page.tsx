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
            <div className="bg-gray-800 p-4 rounded-lg mt-6">
              <h2 className="text-xl font-medium">User Preferences</h2>
              
              {/* Age Preference */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Age Preference</label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  step="1"
                  className="w-full"
                />
                <p className="text-xs text-gray-400">Adjust your preferred age range.</p>
              </div>

              {/* Distance Range */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Distance Range</label>
                <Slider
                  min={0}
                  max={user?.isPremium ? 10000 : 1000}
                  step={10}
                  defaultValue={50}
                />
                <p className="text-xs text-gray-400">
                  Set your search distance (up to {user?.isPremium ? "10,000" : "1,000"} km).
                </p>
              </div>

              {/* Location (Premium Only) */}
              {user?.isPremium && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter city or ZIP code"
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
                  />
                  <p className="text-xs text-gray-400">Set your preferred location.</p>
                </div>
              )}

              {/* Gender Preference */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Gender Preference</label>
                <select className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100">
                  <option>All</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                </select>
                <p className="text-xs text-gray-400">Select preferred genders to match with.</p>
              </div>

              {/* Profile Visibility */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                <select className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100">
                  <option>Public</option>
                  <option>Private</option>
                </select>
                <p className="text-xs text-gray-400">Choose who can view your profile.</p>
              </div>

              {/* Notification Settings */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Notifications</label>
                <input type="checkbox" className="mr-2"/>
                <span className="text-sm">Receive email notifications</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
