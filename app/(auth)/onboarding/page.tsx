import AccountProfile from "@/components/forms/AccountProfile";

import { userInfo } from "os";
import React from "react";

const OnboardingPage =async () => {


const userInfo = {}

const userData = {
  id:user?.id || "",
  objectId:userInfo?._id ,
  username:userInfo?.username,
  bio:userInfo.bio || "",
  name: userInfo?.name || userInfo?.firstName,
  image:userInfo?.image || user?.imageUrl
}


  return (
    <section className="mx-auto flex max-w-3xl flex-col px-10 py-20">
      <h1 className="head-text">onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to use Zetro
      </p>

      <section className="mt-9 bg-dark-2 p-10 ">
        <AccountProfile user={userData} />
      </section>
    </section>
  );
};

export default OnboardingPage;
