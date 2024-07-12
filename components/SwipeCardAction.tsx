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
        className="shadow-lg h-14 w-14 scale-100 rounded-full bg-black/40 hover:scale-[120%]  transition-all ease-in flex items-center justify-center"
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
