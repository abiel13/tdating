import SwipeCard from "@/components/SwipeCard";
import { dates } from "@/constants/dates";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex justify-center md:items-center py-3">
      {dates.map((item, i) => (
        <SwipeCard {...item} key={i} />
      ))}
    </div>
  );
};

export default Dashboard;
