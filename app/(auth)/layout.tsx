import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full bg-[#121204]">{children}</div>;
};

export default AuthLayout;
