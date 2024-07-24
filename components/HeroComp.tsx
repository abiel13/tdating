import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroComp = () => {
  return (
    <div className="w-full min-h-[50vh] flex items-center mt-[4rem] md:mt-0 flex-col md:flex-row">
      <div className="flex flex-col items-start flex-1 gap-8">
        <h2 className="font-bold text-white text-3xl capitalize font-sans text-center md:text-left w-full md:w-[60%]">
          Welcome to{" "}
          <span className="text-white font-bold text-2xl font-sans italics">
            Flirt <span className="text-primary ">Gram</span>
          </span>{" "}
          meet new people online
        </h2>

        <p className="text-gray-400 font-sans md:text-lg md:w-[75%] text-center md:text-justify">
          Welcome to{" "}
          <span className="text-white font-bold text-2xl font-sans italics">
            Flirt <span className="text-primary ">Gram</span>
          </span>{" "}
          the ultimate Telegram-based dating app! Discover love, make new
          friends, and expand your social circle all in one place. With our
          intuitive swipe feature, you can easily find matches, chat instantly
          through Telegram's secure messaging, and connect with people who share
          your interests.
        </p>
        <p className="text-gray-400 font-sans text-lg md:w-[75%] text-center md:text-justify hidden md:block">
          Whether you're looking for a romantic partner or new friendships, our
          app offers a safe and fun environment to meet new people. Join us
          today and start your journey to meaningful connections!
        </p>
        <Link
          className="bg-air_force_blue px-4 py-2  text-white font-bold font-sans rounded-lg w-full text-center md:w-fit"
          href="/login"
        >
          Login Now
        </Link>
      </div>
      <div className="flex-1 h-full">
        <div className="relative h-[300px] w-[230px] md:h-[550px] md:w-auto ">
          <Image
            src={"/assets/hero.png"}
            className="object-contain"
            alt=""
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
