import Image from "next/image";
import React from "react";

const PreferencesPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center b">
      <div className="md:w-[40%]  w-fulla  flex flex-col items-center">
        <div className="w-[300px] h-[400px] relative ">
          <Image
            src={"/assets/work.png"}
            className="object-contain aspect-video"
            alt="const"
            fill
          />
        </div>
      <h1 className="text-white font-bold text-xl text-center">Sorry, This page is currently under developement</h1>
      </div>
    </div>
  );
};

export default PreferencesPage;
