"use client";


import React, { useState } from 'react';

const UserPreferences = () => {
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [distance, setDistance] = useState(50);
  const [genderPreference, setGenderPreference] = useState('');
  const [interests, setInterests] = useState([]);

  const handleGenderChange = (e) => setGenderPreference(e.target.value);

  const handleAgeRangeChange = (e, index) => {
    const newAgeRange = [...ageRange];
    newAgeRange[index] = e.target.value;
    setAgeRange(newAgeRange);
  };

  const handleDistanceChange = (e) => setDistance(e.target.value);

  return (
    <div className="flex flex-col items-center p-6 bg-[#060218] min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">Preferences</h2>

      {/* Age Range */}
      <div className="w-full max-w-md p-4 bg-[#1b1338] rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Age Range</h3>
        <div className="flex items-center justify-between gap-4">
          <input
            type="number"
            min="18"
            max="60"
            value={ageRange[0]}
            onChange={(e) => handleAgeRangeChange(e, 0)}
            className="w-16 p-2 bg-[#2c1d52] border border-[#57468a] rounded text-white focus:ring focus:ring-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            min="18"
            max="60"
            value={ageRange[1]}
            onChange={(e) => handleAgeRangeChange(e, 1)}
            className="w-16 p-2 bg-[#2c1d52] border border-[#57468a] rounded text-white focus:ring focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Gender Preference */}
      <div className="w-full max-w-md p-4 bg-[#1b1338] rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Gender Preference</h3>
        <select
          value={genderPreference}
          onChange={handleGenderChange}
          className="w-full p-2 bg-[#2c1d52] border border-[#57468a] rounded text-white focus:ring focus:ring-blue-500"
        >
          <option value="" disabled>Select gender preference</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
          <option value="everyone">Everyone</option>
        </select>
      </div>

      {/* Distance Range */}
      <div className="w-full max-w-md p-4 bg-[#1b1338] rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Distance Range</h3>
        <input
          type="range"
          min="1"
          max="100"
          value={distance}
          onChange={handleDistanceChange}
          className="w-full appearance-none h-2 bg-[#57468a] rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <p className="text-sm text-gray-400 mt-2">Max distance: {distance} km</p>
      </div>

      {/* Interests */}
      <div className="w-full max-w-md p-4 bg-[#1b1338] rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {['Travel', 'Music', 'Sports', 'Food', 'Movies', 'Books'].map((interest) => (
            <button
              key={interest}
              onClick={() =>
                setInterests((prev) =>
                  prev.includes(interest)
                    ? prev.filter((i) => i !== interest)
                    : [...prev, interest]
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                interests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-[#2c1d52] text-gray-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full max-w-md py-2 mt-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;
