import AccountProfile from "@/components/AccountProfile";
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
    <section className="mx-auto flex w-full md:max-w-3xl flex-col px-2 md:px-10 md:py-20 bg-black">
      <h1 className="font-bold text-white text-3xl font-sans capitalize text-center">
        Onboarding
      </h1>
      <p className="mt-3 text-base-regular text-gray-100 text-center">
        Complete your profile to use Tdating
      </p>

      <section className="mt-9 bg-dark-2 px-3 md:p-10 ">
        <AccountProfile userInfo={userInfo} btnTitle="Submit" />
      </section>
    </section>
  );
};

export default OnboardingPage;
