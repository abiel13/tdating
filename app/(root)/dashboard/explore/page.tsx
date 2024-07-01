import { Input } from "@/components/ui/input";
import React from "react";

const Explore = () => {
  return (
    <div className="px-2 py-3">
      <h1 className="text-white font-sans font-bold">Explore T-Dating</h1>
      <Input
        className="bg-white w-full px-2 py-2 rounded-full mt-3"
        placeholder="Search ...."
      />

      <div className="mt-8">
        <div className="bg-red-400 h-[230px] w-full rounded-xl"></div>
      </div>
    </div>
  );
};

export default Explore;
