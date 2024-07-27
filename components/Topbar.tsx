"use client";
import { LogOut } from "lucide-react";
import React from "react";
import Logo from "./Logo";

const Topbar = () => {
  return (
    <div className="md:hidden flex items-center px-3 py-2 justify-between border-b border-gray-300">
     <Logo />

      <LogOut color="white" />
    </div>
  );
};

export default Topbar;
