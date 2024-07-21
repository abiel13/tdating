"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

const TelegramLoginButton = () => {
  const router = useRouter();

  const onTelegramAuth = (user: any) => {
    console.log(user);
    document.cookie = `tdating-user-data=${JSON.stringify(user)}`;
    alert(user.toString());
    router.push("/onboarding");
  };

  
  return (
    <div >
      <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="flirtgram_bot"
        data-size="medium"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      ></Script>
    </div>
  );
};

export default TelegramLoginButton;
// useEffect(() => {
  //   window.onTelegramAuth = onTelegramAuth;

  //   const script = document.createElement("script");
  //   script.src = "https://telegram.org/js/telegram-widget.js?22";
  //   script.async = true;
  //   script.setAttribute("data-telegram-login", "testdate12_bot");
  //   script.setAttribute("data-size", "large");
  //   script.setAttribute("data-onauth", "onTelegramAuth(user)");
  //   script.setAttribute("data-request-access", "write");
  //   const container = document.getElementById("telegram-login-container");

  //   if (container) {
  //     container.appendChild(script);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeChild(script);
  //     }
  //     window.onTelegramAuth = undefined;
  //   };
  // }, [onTelegramAuth]);
