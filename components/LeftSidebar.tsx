"use client";

import { sidebarlinks } from "@/constants/sidebarlinks";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="bg-[#0b0c0b] border-r border-gray-400  w-[20%] h-full px-3 py-3 md:flex flex-col justify-between hidden">
      <div className="py-4 px  mb-[2rem]">
        <h1 className="text-white font-bold text-3xl ">
          T- <span className="text-primary">Dating</span>
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
          <h3 className="text-white font-semibold">Abiel Asimiea</h3>
          <p className="text-gray-300">dbestabi28@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
