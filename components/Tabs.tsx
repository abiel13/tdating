"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MetabLinks = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();
  console.log(pathname);

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={` px-3 py-2 rounded-lg ${
        isActive ? "bg-blue-800" : "bg-gray-300/30"
      }`}
    >
      <h3 className="text-white font-medium tracking-wide text-base">
        {title}
      </h3>
    </Link>
  );
};

const MeTabs = () => {
  return (
    <div className=" px-4 py-3 mb-3">
      <h3 className="font-bold text-lg text-white">Message Request</h3>

      <div className="mt-4 flex items-center gap-5 ">
        <MetabLinks href="/dashboard/messages" title="Recieved" />
        <MetabLinks href="/dashboard/messages/sent" title="Sent" />
        <MetabLinks href="/dashboard/messages/viewed" title="Viewed" />
      </div>
    </div>
  );
};
export default MeTabs;
