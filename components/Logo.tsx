import React from "react";

const Logo = ({ otherStyles }: { otherStyles?: string }) => {
  return (
    <span
      className={`text-white font-bold text-2xl font-sans italics ${otherStyles}`}
    >
      Flirt <span className="text-primary ">Gram</span>
    </span>
  );
};

export default Logo;
