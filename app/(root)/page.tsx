import HeaderComp from "@/components/Header";
import HeroComp from "@/components/HeroComp";
import Reviews from "@/components/Reviews";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const isloggedIn = cookies().get("tdating-user-data");
  const isOnboarded = cookies().get("tdating-user");

  if (isOnboarded) {
    redirect("/dashboard");
  }

  if (isloggedIn) {
    const { id, first_name, last_name, username, photo_url } = JSON.parse(
      isloggedIn.value
    ) as any;

    redirect(
      `/onboarding?id=${id}&first_name=${first_name}&last_name=${last_name}&username=${username}&photo_url=${photo_url}`
    );
  }

  return (
    <>
      <div className="gradient-right min-h-screen w-screen px-3 md:px-[3rem] py-8">
        <HeaderComp />
        <HeroComp />
      </div>

      <div className="py-[2rem] px-3  md:px-[3rem] mt-[2rem] flex flex-col gap-8">
        <h1 className="text-4xl font-sans font-semibold">
          Dating, Make Friends <br />& Meet New People
        </h1>
        <p className="  md:w-[60%] text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit esse
          voluptates consectetur cumque doloremque ut magni eius, dolores quam
          eveniet, magnam qui consequatur, obcaecati aspernatur?
        </p>
      </div>

      <Reviews />
    </>
  );
}
