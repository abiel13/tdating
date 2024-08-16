"use client";
import React, { useState } from "react";
import Stages from "./Stages";

const totalStages = 5;
const OnboardCard = ({ userInfo }: { userInfo: any }) => {
  const [stage, setStage] = useState(0);
  return (
    <div className="w-[90vw] md:w-[40vw] rounded-lg shadow-xl min-h-[60vh] bg-[rgb(0,22,43)]">
      {/* stage indicator */}
      <div
        style={{
          width: ((stage + 1) / totalStages) * 100 + "%",
        }}
        className={`bg-white h-[2px]  rounded-lg transition-all ease-in duration-75`}
      />
      {/* stages  */}
      <Stages stage={stage} userInfo={userInfo} setStage={setStage} />
    </div>
  );
};

export default OnboardCard;
