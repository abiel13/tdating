import MeTabs from "@/components/Tabs";
import React, { ReactNode } from "react";

function Messagelayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col  md:px-4 ">
      {/* tabs  */}
      <MeTabs />
      {children}
    </div>
  );
}

export default Messagelayout;
