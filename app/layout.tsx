"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tinder Clone",
  description: "Dating app for telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.getElementById("telegram-container")!.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <body className={`  ${inter.className}`}>
        <main id="telegram-container">{children}</main>
      </body>
    </html>
  );
}
