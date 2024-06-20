import { Inter } from "next/font/google";
import "./globals.css";
import TelegramContainer from "@/components/TelegramContainer";

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
  return (
    <html lang="en">
      <body className={`  ${inter.className}`}>
        <TelegramContainer>{children}</TelegramContainer>
      </body>
    </html>
  );
}
