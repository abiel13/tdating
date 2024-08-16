import AccountProfile from "@/components/AccountProfile";
import Logo from "@/components/Logo";
import React from "react";

const OnboardingPage = async ({
  searchParams: { id, first_name, last_name, username, photo_url },
}: any) => {
  const userInfo = {
    id: id || "",
    first_name: first_name || "",
    last_name: last_name || "",
    username: username || "",
    photo_url: photo_url || "",
  };

  return (
    <section className="w-full h-screen overflow-y-hidden bg-[#011014] flex items-center justify-center flex-col gap-5">
      <h1 className="text-white font-bold font-sans text-2xl">
        Welcome to{"  "}
        <Logo />{" "}
      </h1>{" "}
      <section className="">
        <AccountProfile userInfo={userInfo} btnTitle="Submit" />
      </section>
    </section>
  );
};

export default OnboardingPage;
