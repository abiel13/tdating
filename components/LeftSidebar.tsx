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
    { label: "Home", href: "/dashboard", Icon: Home },
    { label: "Messages", href: "/dashboard/messages", Icon: MessageCircle },
    { label: "Profile", href: `/dashboard/profile/${user?.id}`, Icon: User },
    { label: "Subscription", href: `/dashboard/subscription`, Icon: DollarSign },
  ];

  return (
    <section className="bg-[#060218] border-r border-gray-600 w-[20%] h-screen px-5 py-6 hidden flex-col justify-between sticky top-0  md:flex">
      <div className="flex items-center justify-start mb-8">
        <Logo />
      </div>

      <div className="flex flex-col gap-6">
        {sidebarlinks.map((item, i) => {
           const isActive =
           item.href === pathname ||
           (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard");
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-md transition-colors duration-200 ${
                isActive ? "bg-primary text-white" : "bg-gray-700/40 text-gray-200"
              } hover:bg-gray-600`}
            >
              <item.Icon color={isActive ? "#ffffff" : "#a0a0a0"} />
              <p className={`text-base font-medium ${isActive ? "text-white" : "text-gray-300"}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-4 p-3 rounded-md bg-gray-700/40 hover:bg-gray-600 transition-colors duration-200">
        <LogOut color="#ffffff" />
        <p className="text-gray-300 font-medium">Logout</p>
      </div>
    </section>
  );
};

export default LeftSidebar;
