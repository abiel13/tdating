import AccountProfile from "@/components/AccountProfile";

import { userInfo } from "os";
import React from "react";

const OnboardingPage =async () => {


const userInfo = {}




  return (
    <section className="mx-auto flex max-w-3xl flex-col px-10 py-20">
      <h1 className="font-bold text-white text-3xl font-sans capitalize">onboarding</h1>
      <p className="mt-3 text-base-regular text-gray-100">
        Complete your profile to use Zetro
      </p>

      <section className="mt-9 bg-dark-2 p-10 ">
        <AccountProfile btnTitle="Submit" />
      </section>
    </section>
  );
};

export default OnboardingPage;
