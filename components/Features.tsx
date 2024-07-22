import { features } from "@/constants/reviews";
import React from "react";

const FeatturesCard = ({ title, desc, Icon }: any) => {
  return (
    <div className="w-full min-h-[90px]  rounded-xl bg-air_force_blue2-500 flex items-center gap-3 px-2 py-2">
      <div className="h-[60px] w-[60px] rounded-lg bg-air_force_blue-300/30 flex-shrink-0 flex items-center justify-center">
        <Icon size={32} color={"white"} />
      </div>
      <div className="flex flex-col items-start gap-2 self-start h-full flex-1">
        <h1 className="text-white font-bold text-lg font-sans">{title}</h1>
        <p className="text-gray-300 text-sm">{desc}</p>
      </div>
      <div></div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="min-h-[40vh] px-3 md:px-[3rem] flex flex-col gap-8 mt-[10vh]">
      <h1 className="font-bold text-3xl font-sans">Features</h1>
      <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
        {features.map((item, i) => (
          <FeatturesCard title={item.title} Icon={item.Icon} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default Features;
