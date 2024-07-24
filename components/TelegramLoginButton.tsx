"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getuserName } from "@/lib/actions/user.actions";

const TelegramLoginButton = () => {
  const router = useRouter();

  const onTelegramAuth = useCallback(
    async (user: any) => {
      console.log(user);

      try {
        const { first_name, last_name, username, id, photo_url } = user;
        alert(username);
        const userExist: any = await getuserName(username);
        if (userExist) {
          document.cookie = `flirtgram-user=${JSON.stringify({
            id: userExist._id,
            username: userExist.username,
          })}`;
          alert(true);
          router.push("/dashboard");
        } else {
          router.push(
            `/onboarding?id=${id}&first_name=${first_name}&last_name=${last_name}&username=${username}&photo_url=${photo_url}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

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
