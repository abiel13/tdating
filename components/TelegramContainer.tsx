'use client'
import React, { useEffect } from 'react'

const TelegramContainer = ({children } : Readonly<{children: React.ReactNode}>) => {


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.getElementById("telegram-container")!.appendChild(script);
      }, []);
  return (
    <main  id="telegram-container">
      {children}
    </main>
  )
}

export default TelegramContainer

