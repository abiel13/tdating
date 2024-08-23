"use client";
import NotFound from "@/components/NotFound";
import SwipeCard from "@/components/SwipeCard";
import { getUserByLocation } from "@/lib/actions/user.actions";
import { calculateAge } from "@/lib/utils/utils";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const Dashboard = () => {
  const [currentDate, setcurrentDate] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dat, setDat] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        // const response = await getUserByLocation("4.8472226", "6.974604");
        // setDat(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {loading ? (
        <div className="md:h-full w-full items-center justify-center flex min-h-screen">
          <Circles />
        </div>
      ) : (
        <>
          {hasMore ? (
            <div className="w-full min-h-screen  my-[10%] md:my-0 flex justify-center md:items- py-3 md:h-full ">
              {dat?.map((item, i) => {
                const active = currentDate == i;
                return (
                  <SwipeCard
                    fullName={item.fullName}
                    profilePictures={item.profilePictures}
                    bio={item.bio}
                    id={item._id}
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
      )}
    </>
  );
};

export default Dashboard;
