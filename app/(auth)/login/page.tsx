// pages/telegram-login.js

import Head from "next/head";
import Script from "next/script";
import styles from "@/styles/telegram-login.module.css";

export default function TelegramLogin() {
  return (
    <>
      <Head>
        <title>Telegram Login</title>
      </Head>
      <div className={styles.container}>
        <h1 className="text-white font-bold text-lg mb-8">
          Login To FlirtGram
        </h1>
        <div id="telegram-login-container"></div>
      </div>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="flirtgram_bot"
        data-size="large"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
      <Script id="telegram-auth-handler" strategy="afterInteractive">
        {`
          function onTelegramAuth(user) {
            alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            console.log(user)
          }
        `}
      </Script>
    </>
  );
}
