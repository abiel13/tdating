"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MetabLinks = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full transition-all duration-300 ${
        isActive ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gray-500/20 hover:bg-gray-500/40"
      }`}
    >
      <h3
        className={`text-base font-semibold tracking-wide ${
          isActive ? "text-white" : "text-gray-200"
        }`}
      >
        {title}
      </h3>
    </Link>
  );
};

const MeTabs = () => {
  return (
    <div className="px-5 py-4 mb-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg flex flex-col items-center">
      <h3 className="font-bold text-xl text-white mb-4 text-center">Message Requests</h3>

      <div className="flex items-center gap-6">
        <MetabLinks href="/dashboard/messages" title="Received" />
        <MetabLinks href="/dashboard/messages/sent" title="Sent" />
        <MetabLinks href="/dashboard/messages/viewed" title="Viewed" />
      </div>
    </div>
  );
};

export default MeTabs;
