"use client";
import NotFound from "@/components/NotFound";
import SwipeCard from "@/components/SwipeCard";
import { updateUser } from "@/lib/actions/user.actions";
import {
  fetchPossibleDates,
  updateByUserId,
} from "@/lib/actions/userprefrences.actions";
import { calculateAge, getLocation } from "@/lib/utils/utils";
import { useLocationStore } from "@/providers/location.provider";
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
  const { saved, setSaved } = useLocationStore((state) => state);

  useEffect(() => {
    (async function () {
      if (!user) {
        return;
      }
      try {
        setLoading(true);
        //  get user location and save it to db
        if (!saved) {
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
            setSaved(true);
          } catch (error) {
            console.log(error);
            setLocationerror(true);
          }
        }
        // fetch feed based on current preferences
        const dates = await fetchPossibleDates(user!.id);
    
        setDat(dates);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="md:h-full w-full items-center justify-center flex min-h-screen">
          <Circles  />
        </div>
      ) : (
        <>
          {hasMore ? (
            <div>
              {dat.length > 0 ? (
                <div className="w-full min-h-screen  my-[10%] md:my-0 flex justify-center md:items- py-3 md:min-h-screen px-3">
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
                  title={"Could Fetch Feed With Your Current Prefrences"}
                  desc="
        Try changing your prefrences and allowing location to get more feeds
        "
                />
              )}
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
