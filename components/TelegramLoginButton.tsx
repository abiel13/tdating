// components/TelegramLogin.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TelegramLoginButton = () => {
  const router = useRouter();

  // Define the callback function
  const onTelegramAuth = (user: any) => {
    console.log(user); // This will log the Telegram username and ID
    document.cookie = `tdating-user-data=${JSON.stringify(user)}`; // Ensure the user object is serialized to JSON string
    router.push("/onboarding");
  };

  useEffect(() => {
    // Ensure window.onTelegramAuth is defined before the script is loaded
    window.onTelegramAuth = onTelegramAuth;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "testdate12_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-container")!.appendChild(script);

    return () => {
      // Clean up by removing the script and clearing the window.onTelegramAuth
      document.getElementById("telegram-login-container")!.removeChild(script);
      window.onTelegramAuth = undefined;
    };
  }, [onTelegramAuth]);

  return (
    <div id="telegram-login-container" className="px-">
      Login
    </div>
  );
};

export default TelegramLoginButton;
