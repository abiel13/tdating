"use client";

import { sidebarlinks } from "@/constants/sidebarlinks";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  return (
    <section className="bg-[#0b0c0b] border-r border-gray-400  w-[20%] h-full px-3 py-3 flex flex-col justify-between">
      <div className="mb-[30%]">logo and stuff</div>

      <div className="flex flex-col gap-8 flex-1">
        {sidebarlinks.map((item, i) => {
          const pathname = usePathname();
          const active =
            item.href === pathname || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={i}
              className={`${active ? 'bg-primary' : 'bg-gray-600/50'} flex items-center gap-3 py-2 px-3 rounded-lg`}
              href={item.href}
            >
              <item.Icon color="white" />
              <p className="text-white">{item.label}</p>
            </Link>
          );
        })}
      </div>

      <div>
        <LogOut color="white" />
      </div>
    </section>
  );
};

export default LeftSidebar;
