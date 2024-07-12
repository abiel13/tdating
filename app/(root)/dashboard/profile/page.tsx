import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-8 items-center py-4">
      {/* Header */}
      <div>
        <div className="relative h-24 rounded-full bg-red-400 w-24">
          <Image src={""} alt="" fill />
        </div>
        <h1 className="text-white text-center">name</h1>
        <p className="text-white text-center">email</p>
      </div>

      {/* Acoount Settings & Details */}
    </div>
  );
};

export default UserProfile;
