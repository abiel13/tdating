"use client";
import NotFound from "@/components/NotFound";
import SwipeCard from "@/components/SwipeCard";
import { getUserByLocation } from "@/lib/actions/user.actions";
import { calculateAge } from "@/lib/utils/utils";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [currentDate, setcurrentDate] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [dat, setDat] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getUserByLocation("4.8472226", "6.974604");
        setDat(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {hasMore ? (
        <div className="w-full min-h-full flex justify-center md:items-center py-3 ">
          {dat?.map((item, i) => {
            const active = currentDate == i;
            return (
              <SwipeCard
                fullName={item.fullName}
                profilePictures={item.profilePictures}
                bio={item.bio}
                Age={() => calculateAge(item?.dateOfBirth)}
                key={i}
                isOpaque={active}
                incrementIdx={() => {
                  if (currentDate >= dat?.length - 1) {
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
        <NotFound
          title={"No more Feed In Your Current Prefrences"}
          desc="
        Try changing your prefrences to get more feeds
        "
        />
      )}
    </>
  );
};

export default Dashboard;
