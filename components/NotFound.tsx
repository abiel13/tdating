import Image from "next/image";
import React from "react";

const NotFound = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Image
        src={"/assets/notfound.png"}
        alt="not-found"
        width={250}
        height={250}
      />
      <h1 className="text-white font-bold text-2xl text-center">{title}</h1>
      <p className="text-gray-400">{desc} </p>
    </div>
  );
};

export default NotFound;
