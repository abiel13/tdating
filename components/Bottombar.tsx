"use client";

import { sidebarlinks } from "@/constants/sidebarlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Bottombar = () => {
  return (
    <section className="bg-[#0b0c0b] h-[10%] fixed z-50 bottom-0 flex md:hidden w-full items-centerbg-[#0b0c0b] justify-around  items-center">
      {sidebarlinks.map((item, i) => {
        const pathname = usePathname();
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
