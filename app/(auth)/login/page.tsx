import TelegramLoginButton from "@/components/TelegramLoginButton";

export default function LoginPage() {
  return (
    <div className="bg-air_force_blue-100 h-screen flex items-center justify-center flex-col">
      <div className="w-[350px] bg-air_force_blue-300 flex flex-col items-center h-[300px] rounded-lg px-4 py-3">
        <h1 className="text-white font-bold font-sans text-xl mb-8">
          Login To Flirt<span className="text-red-500">Gram</span> With Telegram
        </h1>
        <TelegramLoginButton />
      </div>
    </div>
  );
}
