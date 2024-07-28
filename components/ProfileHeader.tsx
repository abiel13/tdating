import { User } from "@/lib/store/user.store";
import { calculateAge } from "@/lib/utils/utils";
import Image from "next/image";
import React from "react";

const ProfileHeader = ({ userData }: { userData: User | null }) => {
  return (
    <div className="min-h-[30vh] flex md:items-center gap-10">
      <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] relative flex-shrink-0">
        <Image
          src={userData?.profilePictures[0] || ""}
          alt="user_profile image"
          fill
          className="rounded-full object-cover object-top"
        />
      </div>

      <div className="flex flex-col items-start gap-2 self-start">
        <h3 className="font-bold text-white font-sans">
          <span className="font-bold">Name: </span> {userData?.fullName}
        </h3>
        <p className="text-gray-300 text-md">
          <span className="font-bold">Gender: </span>
          {userData?.gender}
        </p>
        <p className="text-gray-300 text-md">
          <span className="font-bold">Age: </span>{" "}
          {calculateAge(userData?.dateOfBirth)}
        </p>
        <p className="text-gray-300 text-md">
          <span className="font-bold">Interests: </span>
          {userData?.interests
            ? userData?.interests.join(", ")
            : "No interests available"}
        </p>
        <p className="text-gray-300 text-md md:w-[80%]">
          <span className="font-bold">Bio: </span>
          {userData?.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
