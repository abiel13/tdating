import Features from "@/components/Features";
import HeaderComp from "@/components/Header";
import HeroComp from "@/components/HeroComp";
import Logo from "@/components/Logo";
import Reviews from "@/components/Reviews";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const isloggedIn = cookies().get("flirtgram-user");

  if (isloggedIn) {
    redirect("/dashboard");
  } else {
  console.log('cookie not availiable')
  }

  return (
    <>
      <div className="gradient-bottom md:gradient-right min-h-screen w-screen px-3 md:px-[3rem] py-8">
        <HeaderComp />
        <HeroComp />
      </div>
      <div className="py-[2rem] px-3  md:px-[3rem] mt-[10vh] flex flex-col gap-8 ">
        <h1 className="text-4xl font-sans font-semibold">
          <span className="text-red-500">Dating</span>, Make Friends <br />&
          <span className="text-red-500"> Meet New People</span>
        </h1>
        <p className="  md:w-[60%] text-gray-500">
          Discover a whole new way to connect with others through our
          Telegram-based app. Whether you're looking for love, new friendships,
          or just want to expand your social circle, our app makes it easy.
          Swipe through profiles, chat instantly, and find people who share your
          interests. With features designed for secure and fun interactions, you
          can confidently explore new connections in your area. Join us and
          start meeting new people today!
        </p>
      </div>
      <Features />
      <Reviews />
      <div className="justify-center bg-air_force_blue-100 px-3 md:px-[3rem] flex items-center py-3  mt-[10vh]">
        <h3 className="text-gray-200 font-lg font-sans font-bold">
          Copyright &copy; <Logo otherStyles="text-sm" />
        </h3>
      </div>
    </>
  );
}
