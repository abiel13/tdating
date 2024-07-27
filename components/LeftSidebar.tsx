"use client";

import { LogOut } from "lucide-react";
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
  ];

  return (
    <section className="bg-air_force_blue-100 border-r border-gray-400  w-[20%] h-full px-3 py-3 md:flex flex-col justify-between hidden">
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

      <div className="flex items-center gap-4">
        <LogOut color="white" />
        <div className="flex flex-col item-start">
          <p className="text-gray-300">{user?.username}</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
