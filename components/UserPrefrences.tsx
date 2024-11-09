"use client";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Modal from "./Modal";
import Link from "next/link";
import {
  getUserPrefrences,
  updateByUserId,
} from "@/lib/actions/userprefrences.actions";
import AgeRangeSlider from "./AgeSlider";
import { ValueIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

function UserPreferences({ user }: any) {
  const [preferences, setPreferences] = useState({
    distance: 0,
    age: {
      min: 18,
      max: 100,
    },
    gender: "any",
    visibility: "Public",
  });

  const [distance, setDistance] = useState(50);
  const [Age, setAge] = useState(18);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferencesChanged, setPreferencesChanged] = useState(false);
  const pathname = usePathname();

  const handleDistanceChange = (value: number) => {
    if (!user?.isPremium && value > 1000) {
      setIsModalOpen(true); // Open the modal if non-premium user exceeds 1000
    } else {
      setPreferences({ ...preferences, distance: value });
      setPreferencesChanged(true); // Enable save button when preference is changed
    }
  };

  const handlePreferenceChange = () => {
    setPreferencesChanged(true);
  };

  const handleVisibilityChange = (value: string) => {
    if (!user?.isPremium && value === "Private") {
      setIsModalOpen(true); // Open the modal if non-premium user exceeds 1000
    } else {
      setPreferences({ ...preferences, visibility: value });
      setPreferencesChanged(true); // Enable save button when preference is changed
    }
  };

  const handleSavePreferences = async () => {
    const obj = {
      maxDistance: preferences.distance,
      preferredGender: preferences.gender,
      ageRange: preferences.age,
      visibility: preferences.visibility,
    };

    try {
      const update = await updateByUserId(user, obj, pathname);
    } catch (error) {
    } finally {
      setPreferencesChanged(false);
    }

    // Add logic to save preferences here
    // Disable button after saving
  };

  useEffect(() => {
    (async function () {
      try {
        const userp = await getUserPrefrences(user);
        if (userp) {
          setPreferences({
            distance: userp.maxDistance,
            age: userp.ageRange,
            gender: userp.preferredGender,
            visibility: "Public",
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <h2 className="text-xl font-medium">User Preferences</h2>

      {/* Age Preference */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Age Preference</label>
        <AgeRangeSlider
          max={preferences.age.max}
          min={preferences.age.min}
          setMin={(value: number) => {
            setPreferencesChanged(true);
            setPreferences({
              ...preferences,
              age: {
                min: value,
                max: preferences.age.max,
              },
            });
          }}
          setMax={(value: number) => {
            setPreferencesChanged(true);
            setPreferences({
              ...preferences,
              age: {
                max: value,
                min: preferences.age.min,
              },
            });
          }}
        />

        <p className="text-xs text-gray-400">
          Adjust your preferred age range.
        </p>
      </div>

      {/* Distance Range */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Distance Range</label>
        <Slider
          min={0}
          max={10000}
          step={10}
          value={preferences.distance}
          onChange={handleDistanceChange}
        />
        <p className="text-xs text-gray-400">
          Set your search distance (up to {user?.isPremium ? "10,000" : "1,000"}{" "}
          km).
        </p>
      </div>

      {/* Location (Premium Only) */}
      {user?.isPremium && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter city or ZIP code"
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
            onChange={handlePreferenceChange}
          />
          <p className="text-xs text-gray-400">Set your preferred location.</p>
        </div>
      )}

      {/* Gender Preference */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Gender Preference
        </label>
        <select
          value={preferences.gender}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setPreferences({ ...preferences, gender: e.target.value });
          }}
        >
          <option value={"any"}>Any</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Non-binary"}>Non-binary</option>
        </select>
        <p className="text-xs text-gray-400 mt-4">
          Select preferred genders to match with.
        </p>
      </div>

      {/* Profile Visibility */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Profile Visibility
        </label>
        <select
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-100"
          value={preferences.visibility}
          onChange={(e) => handleVisibilityChange(e.target.value)}
        >
          <option value={"Public"}>Public</option>
          <option value={"Private"}>Private</option>
        </select>
        <p className="text-xs text-gray-400">
          Choose who can view your profile.
        </p>
      </div>

      {/* Notification Settings */}

      {/* Save Preferences Button */}
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        disabled={!preferencesChanged}
        onClick={handleSavePreferences}
      >
        Save Preferences
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="text-center text-gray-800">
            Upgrade to premium to access this feature
          </p>
          <Link
            href={"/dashboard/subscription"}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Go to Subscription Page
          </Link>
        </Modal>
      )}
    </div>
  );
}

export default UserPreferences;
