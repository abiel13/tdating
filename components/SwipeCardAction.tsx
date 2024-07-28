import React from "react";

interface SwipeCardActionI {
  desc: string;
  Icon: any;
  fill?: string;
  color?: string;
  onclick?: () => void;
}

const SwipeCardAction = ({
  Icon,
  desc,
  onclick,
  fill,
  color,
}: SwipeCardActionI) => {
  return (
    <div className="flex flex-col items-center ">
      <div
        onClick={onclick}
        className={`border-[1px] w-[80px] h-[80px] flex items-center justify-center rounded-full`}
      >
        <Icon fill={fill} color={color} size={32} />
      </div>{" "}
      <div>
        <h2 className="text-white font-bold font-smash">{desc}</h2>
      </div>
    </div>
  );
};

export default SwipeCardAction;
