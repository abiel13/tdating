import Logo from "@/components/Logo";
import TelegramLoginButton from "@/components/TelegramLoginButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const isloggedIn = cookies().get("flirtgram-user");

  if (isloggedIn) {
    redirect("/dashboard");
  } else {
    console.log("cookie not availiable");
  }

  return (
    <div className="h-screen bg-[#060218] flex items-center justify-center w-full">
      <div className="w-full h-full md:w-[50vw] md:h-[50%] bg-[#bbb9be04] rounded-lg shadow-lg px-4 py-4 flex flex-col items-center justify-center">
        <Logo />
        <p className="text-gray-500 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          veniam beatae! Assumenda modi itaque eveniet!
        </p>
        <TelegramLoginButton />
      </div>
    </div>
  );
}
