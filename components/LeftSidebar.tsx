"use client";

import { DollarSign, LogOut, Settings } from "lucide-react";
import { Home, MessageCircle, SearchCheck, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "./Logo";
import { useUserStore } from "@/providers/user.provider";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { user } = useUserStore((state) => state);

  const sidebarlinks = [
    {
      label: "Home",
      href: "/dashboard",
      Icon: Home,
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      Icon: MessageCircle,
    },
    {
      label: "profile",
      href: `/dashboard/profile/${user?.id}`,
      Icon: User,
    },
    {
      label: "Preferences",
      href: `/dashboard/preferences/${user?.id}`,
      Icon: Settings,
    },
    {
      label: "Subscription",
      href: `/dashboard/subscription/${user?.id}`,
      Icon: DollarSign,
    },
  ];

  return (
    <section className="bg-[#bbb9be04] border-r border-gray-400  w-[20%] h-screen px-3 py-3 md:flex flex-col justify-between sticky top-0 hidden">
      <div className="py-4 px  mb-[2rem]">
        <h1 className="text-white font-bold text-3xl ">
          <Logo />
        </h1>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        {sidebarlinks.map((item, i) => {
          const active =
            item.href === pathname ||
            (pathname.startsWith(`${item.href}/`) &&
              item.href !== "/dashboard");
          return (
            <Link
              key={i}
              className={`${
                active ? "bg-primary" : "bg-gray-600/50"
              } flex items-center gap-3 py-2 px-3 rounded-lg`}
              href={item.href}
            >
              <item.Icon color="white" />
              <p className="text-white">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
