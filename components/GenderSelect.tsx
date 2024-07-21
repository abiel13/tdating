import React, { useState } from "react";

const GenderSelectComponent = ({
  selectedGender,
  setSelectedGender,
  error,
}: {
  selectedGender: string;
  setSelectedGender: any;
  error: string;
}) => {
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="gender-select"
        className=" text-lg font-medium text-white"
      >
        Select Gender:
      </label>
      <select
        id="gender-select"
        value={selectedGender}
        onChange={handleGenderChange}
        className="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="" disabled>
          -- Select a Gender --
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-Binary</option>
        <option value="Other">Other</option>
      </select>

      {error.length && (
        <p className="text-red-500 font-bold text-lg">{error}</p>
      )}
    </>
  );
};

export default GenderSelectComponent;
