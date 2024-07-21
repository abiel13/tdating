// import FooterCarousel from "@/components/FooterCarousel";
import FooterCarousel from "@/components/FooterCarousel";
import TelegramLoginButton from "@/components/TelegramLoginButton";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
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
    <section className="  w-screen min-h-screen bg-[#0b0b0a]">
      <div className="fixed left-[50%] top-[0%] w-[100vw] h-[100vh] -translate-x-[50%] ">
        <div className="relative w-full h-full">
          <Image className="object-cover" src={"/bg.jpeg"} alt="logo" fill />
        </div>
      </div>
      <div className="min-h-[200vh] bg-[#000a] w-screen z-50 relative ">
        <div className="h-screen w-full flex items-center justify-center flex-col">
          <h1 className="text-white text-[3rem] md:text-[6rem] font-extrabold">
            Swipe Right &#174;{" "}
          </h1>
          <div className="flex items-center gap-4 flex-col md:flex-row mt-[1rem] relative">
            <Link
              href={"/login"}
              className="bg-blue-400 rounded-lg px-4 py-2 text-white font-bold  cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="min-h-[110vh] bg-[#111418] mt-[3rem] px-[1rem]">
          <div className="flex flex-col mt-[2rem] h-full">
            <div className="my-[2rem] w-full h-[40%] flex items-center justify-center">
              <FooterCarousel />
            </div>
            <Separator className="mt-[2rem]" />

            <div className="flex flex-col gap-[1.4rem] text-white">
              <h2 className="font-bold text-xl mt-5">Welcome to the app</h2>
              <p className="text-muted-foreground">
                Single people, listen up: If you’re looking for love, want to
                start dating, or just keep it casual, you need to be on Tinder.
                With over 55 billion matches made, it’s the place to be to meet
                your next best match. Let’s be real, the dating landscape looks
                very different today, as most people are meeting online. With
                Tinder, the world’s most popular free dating app, you have
                millions of other single people at your fingertips and they’re
                all ready to meet someone like you. Whether you’re straight or
                in the LGBTQIA community, Tinder’s here to bring you all the
                sparks.{" "}
              </p>
              <div className="text-muted-foreground">
                There really is something for everyone on Tinder. Want to get
                into a relationship? You got it. Trying to find some new
                friends? Say no more. New kid on campus and looking to make the
                most of your college experience? Tinder U’s got you covered.
                Tinder isn’t your average dating site — it’s the most diverse
                dating app, where adults of all backgrounds and experiences are
                invited to make connections, memories, and everything in
                between.
              </div>
            </div>
          </div>
          <Separator className="mt-[2rem]" />
        </div>
      </div>
    </section>
  );
}
