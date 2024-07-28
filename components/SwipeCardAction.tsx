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
        className={`border-[3px] ${fill} w-[80px] h-[80px] flex items-center justify-center rounded-full`}
      >
        <Icon fill={color} color={color} size={48} />
      </div>{" "}
      <div></div>
    </div>
  );
};

export default SwipeCardAction;
