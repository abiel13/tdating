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
    <div className="flex flex-col items-center  px-2">
      <div
        onClick={onclick}
        className={` ${fill} px-3 py-2 rounded-lg  flex items-center gap-2`}
      >
        <p className="text-white font-bold font-sans">{desc}</p>
        <Icon fill={color} color={color} size={18} />
      </div>{" "}
      <div></div>
    </div>
  );
};

export default SwipeCardAction;
