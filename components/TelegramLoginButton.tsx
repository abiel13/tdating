"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const TelegramLoginButton = () => {
  const router = useRouter();

  const onTelegramAuth = useCallback((user: any) => {
    console.log(user);
    document.cookie = `tdating-user-data=${JSON.stringify(user)}`;
    alert(user.toString());
    router.push("/onboarding");
  }, [router]);

  useEffect(() => {
    window.onTelegramAuth = onTelegramAuth;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "flirtgram_bot");
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    const container = document.getElementById("telegram-login-container");

    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.removeChild(script);
      }
      window.onTelegramAuth = undefined;
    };
  }, [onTelegramAuth]);

  return <div id="telegram-login-container" />;
};

export default TelegramLoginButton;
