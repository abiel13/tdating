"use client";
import { LogOut } from "lucide-react";
import React from "react";

const Topbar = () => {
  return (
    <div className="md:hidden flex items-center px-3 py-2 justify-between border-b border-gray-300">
      <h2 className="text-white font-semibold text-xl">
        T- <span className="text-primary">Dating</span>
      </h2>

      <LogOut color="white" />
    </div>
  );
};

export default Topbar;
