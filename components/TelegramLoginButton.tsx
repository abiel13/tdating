"use client";
// components/TelegramLogin.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TelegramLoginButton = () => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "testdate12_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-container")!.appendChild(script);
  }, []);

  // Define the callback function
  const onTelegramAuth = (user: any) => {
    document.cookie = `tdating-user-data=${user}`;
    router.push("/onboarding");
  };

  useEffect(() => {
    window.onTelegramAuth = onTelegramAuth;
  }, []);

  return (
    <div id="telegram-login-container" className="px-">
      Login
    </div>
  );
};

export default TelegramLoginButton;
