"use client";
import NotFound from "@/components/NotFound";
import SwipeCard from "@/components/SwipeCard";
import { updateUser } from "@/lib/actions/user.actions";
import { updateByUserId } from "@/lib/actions/userprefrences.actions";
import { calculateAge, getLocation } from "@/lib/utils/utils";
import { useUserStore } from "@/providers/user.provider";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const Dashboard = () => {
  const [currentDate, setcurrentDate] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dat, setDat] = useState<any[]>([]);
  const { user } = useUserStore((state) => state);
  const [locationerror, setLocationerror] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        //  get user location and save it to db
        try {
          const { latitude, longitude } = await getLocation();

          const update = await updateUser(user!.id, {
            location: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
          });
          const updatePreferences = await updateByUserId(user!.id, {
            location: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
          });
        } catch (error) {
          setLocationerror(true);
        }
// fetch feed based on current preferences


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
