"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface SwipeCardI {
  name: string;
  Age: string;
  desc: string;
  images: string[];
}

const SwipeCard = ({ images, name, Age, desc }: SwipeCardI) => {
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    let startX: number, startY: number, distX: number, distY: number;

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation();
      startX = e.touches[0].screenX;
      startY = e.touches[0].screenY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      distX = e.touches[0].screenX - startX;
      distY = e.touches[0].screenY - startY;

      if (cardRef.current) {
        const isValidRotate = -30 < distX && distX < 30;

        if (!isValidRotate) return;
        cardRef.current.style.transform = `rotate(${distX}deg)`;
      }
    };

    const handleTouchend = (e: TouchEvent) => {
      e.stopPropagation();
      if (cardRef?.current) {
        cardRef.current.style.transform = `rotate(0deg)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      distX = e.screenX - startX;
      distY = e.screenY - startY;
      if (cardRef.current) {
        cardRef.current.style.transform = `rotate(${distX}deg, ${distY}deg)`;

        const isValidRotate = -30 < distX && distX < 30;

        if (!isValidRotate) return;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      startX = e.screenX;
      startY = e.screenY;
    };
    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      cardRef.current.style.transform = `rotate(0deg)`;
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("touchstart", handleTouchStart);
      cardElement.addEventListener("touchmove", handleTouchMove);
      cardElement.addEventListener("touchend", handleTouchend);
      cardElement.addEventListener("mousemove", handleMouseMove);
      cardElement.addEventListener("mouseup", handleMouseUp);
      cardElement.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("touchstart", handleTouchStart);
        cardElement.removeEventListener("touchmove", handleTouchMove);
        cardElement.removeEventListener("touchmove", handleTouchend);
        cardElement.removeEventListener("mousemove", handleMouseMove);
        cardElement.removeEventListener("mouseup", handleMouseUp);
        cardElement.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, []);

  return (
    <div
      id="test-card"
      className="bg-gray-600 md:w-[370px] transition-all ease-in-out duration-75 w-full md:h-[570px] h-[80%] rounded-t-xl  relative 
    "
      ref={cardRef}
    >
      <div className="relative w-full h-[100%] md:h-[100%]">
        <Image
          src={images[currentImage]}
          alt="image"
          className="object-cover rounded-t-xl pointer-events-none"
          fill
        />
      </div>{" "}
      <div className="absolute -bottom-3 w-full z-10 bg-black/80  px-3">
        <h1 className="text-white font-semibold text-3xl">
          {name} <span className="font-medium">{Age}</span>
        </h1>
        <p className="text-gray-400 capitalize text-lg">{desc}</p>
      </div>
      <div className="w-full h-[10px] absolute top-2 flex px-2 gap-1">
        {images.map((item, i) => {
          const active = currentImage === i;
          return (
            <div
              key={i}
              className={` ${
                active ? "bg-white" : "bg-gray-800/70"
              }  border border-white  flex-1 rounded-xl`}
              onClick={() => setCurrentImage(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwipeCard;
