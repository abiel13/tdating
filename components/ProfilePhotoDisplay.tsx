import { User } from "@/lib/store/user.store";
import Image from "next/image";
import React from "react";

const ProfilePhotoDisplay = ({ userData }: { userData: User | null }) => {
  return (
    <div className="my-8 flex flex-col gap-8">
      <h2 className="text-white font-bold font-sans text-xl">
        {userData?.fullName}'s Personal Images
      </h2>
      <div className="grid grid-cols-1 gap-y-3  md:grid-cols-3">
        {userData?.profilePictures.map((item, i) => (
          <div key={i} className="w-[90vw] h-[450px] md:w-[250px] md:h-[350px] relative">
            <Image
              src={item}
              alt={`profile-image${i}`}
              className="object-cover object-top rounded-lg "
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePhotoDisplay;
