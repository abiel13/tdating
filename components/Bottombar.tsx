"use client";

import { DollarSign, Home, MessageCircle, Settings, User } from "lucide-react";
import { useUserStore } from "@/providers/user.provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Bottombar = () => {
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
      label: "Profile",
      href: `/dashboard/profile/${user?.id}`,
      Icon: User,
    },

    {
      label: "Subscription",
      href: `/dashboard/subscription`,
      Icon: DollarSign,
    },
  ];

  return (
    <section className="fixed bottom-0 z-50 w-full h-16 bg-gray-900/90 backdrop-blur-md flex justify-around items-center shadow-lg md:hidden">
      {sidebarlinks.map((item, i) => {
        const active =
          item.href === pathname ||
          (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard");

        return (
          <Link href={item.href} key={i} className="flex flex-col items-center group">
            <item.Icon
              color={active ? "hsl(346.8, 77.2%, 49.8%)" : "#9CA3AF"}
              className={`transition-all duration-300 ${
                active ? "text-pink-500 scale-110" : "text-gray-400 group-hover:scale-110"
              }`}
              size={28}
            />
            <span
              className={`text-xs mt-1 ${
                active ? "text-pink-500" : "text-gray-400 group-hover:text-white"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
