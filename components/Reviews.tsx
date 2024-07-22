import { reviews } from "@/constants/reviews";
import Image from "next/image";
import React from "react";

const Reviews = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-start px-3 md:px-[3rem] mt-[20vh] gap-8 my-8">
      <h3 className="font-sans font-bold text-3xl">Reviews</h3>
      <div className="bg-_force_blue-500 py-5 w-full px-5 flex justify-between md:flex-row flex-col gap-8">
        {reviews.map((item, i) => (
          <div key={i} className="w-full h-[340px] md:w-[240px] md:h-[300px] bg-white rounded-lg flex flex-col gap-2 px-2 py-2 shadow-lg">
            <div className="relative flex-1 w-full h-[200px]">
              <Image src={item.image} alt={item.userName} fill />
            </div>
            <div>
              <h1 className="font-bold font-sans">{item.userName}</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo cum nobis rem deleniti.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
