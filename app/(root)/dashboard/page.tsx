"use client";
import SwipeCard from "@/components/SwipeCard";
import { dates } from "@/constants/dates";
import React, { useState } from "react";

const Dashboard = () => {
  const [currentDate, setcurrentDate] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  return (
    <>
      {hasMore ? (
        <div className="w-full h-full flex justify-center md:items-center py-3 ">
          {dates.map((item, i) => {
            const active = currentDate == i;
            return (
              <SwipeCard
                {...item}
                key={i}
                isOpaque={active}
                incrementIdx={() => {
                  if (currentDate >= dates.length-1) {
                    console.log("ewele");
                    setHasMore((prev) => !prev);
                    return;
                  }
                  setcurrentDate((prev) => prev + 1);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-white font-bold ">
          No more feed
        </div>
      )}
    </>
  );
};

export default Dashboard;
