import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlirtGram",
  description: "Dating app for telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  ${inter.className}`}>
     {children}
      </body>
      <Script src="https://telegram.org/js/telegram-web-app.js" defer></Script>
    </html>
  );
}
