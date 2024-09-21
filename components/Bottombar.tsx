"use client";

import { DollarSign, Home, MessageCircle, SearchCheck, Settings, Star, User } from "lucide-react";
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
    <section className=" h-[10%] bg-white/1 backdrop-blur-lg  fixed z-50 bottom-0 flex md:hidden w-full  justify-around  items-center">
      {sidebarlinks.map((item, i) => {
        const active =
          item.href === pathname ||
          (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard");

        return (
          <Link href={item.href} key={i}>
            <item.Icon
              color={active ? "hsl(346.8, 77.2%, 49.8%)" : "white"}
              fontSize={25}
              fill={active ? "hsl(346.8, 77.2%, 49.8%)" : "white"}
              className={`${
                active ? "scale-125" : "scale-1"
              } transition-all ease-in`}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
