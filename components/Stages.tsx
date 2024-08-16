"use client";
import Image from "next/image";
import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { hobbies } from "@/constants/hobbies";
import SelectImages from "./SelectImages";

const StageOne = ({
  userInfo,
  setStage,
}: {
  userInfo: { first_name: string; username: string; photo_url?: string };

  setStage: (stage: number) => void;
}) => {
  const [image, setImage] = useState<string | null>(userInfo.photo_url || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  };

  return (
    <div className="px-3 py-4 flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <label className="h-[80px] w-[80px] rounded-full flex items-center justify-center bg-gray-700/20 cursor-pointer">
          {image ? (
            <Image
              src={image}
              alt="profile photo"
              width={96}
              height={96}
              className="rounded-full object-contain"
              priority
            />
          ) : (
            <Image
              src={"/assets/profile.svg"}
              alt="profile photo"
              width={24}
              height={24}
              className="object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-0 h-0"
          />
        </label>
      </div>

      <div>
        <h1 className="font-sans text-white font-bold text-lg">Full Name</h1>
        <input
          type="text"
          name="first_name"
          className="text-gray-400 font-sans mt-4 px-3 py-2 rounded-lg w-full bg-transparent border"
          value={userInfo.first_name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <h1 className="font-sans text-white font-bold text-lg">User Name</h1>
        <input
          type="text"
          name="username"
          className="text-gray-400 font-sans mt-4 px-3 py-2 rounded-lg w-full bg-transparent border"
          value={userInfo.username}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={() => setStage(1)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

interface StageTwoProps {
  setStage: (stage: number) => void;
}
interface StageThreeProps {
  setStage: (stage: number) => void;
}

const StageTwo: React.FC<StageTwoProps> = ({ setStage }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = () => {
    // Handle form submission, validation, etc.
    const formData = {
      dateOfBirth,
      gender,
    };
    console.log("Form Data:", formData);

    // Proceed to the next stage
    setStage(2);
  };

  return (
    <div className="px-2 py-3">
      <div className="w-full flex justify-center">
        <h1 className="text-white font-bold text-xl font-sans">
          Tell Us More About You
        </h1>
      </div>

      <div className="mt-5 mb-2">
        <h1 className="mb-4 font-sans text-lg font-bold text-gray-700">
          How Old Are You
        </h1>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          aria-label="Enter your date of birth"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-sans text-lg font-bold text-gray-700">
          Select Gender
        </h1>
        <div className="flex items-center gap-6">
          <RadioButton
            label="Male"
            value="male"
            selectedValue={gender}
            onChange={setGender}
          />
          <RadioButton
            label="Female"
            value="female"
            selectedValue={gender}
            onChange={setGender}
          />
          <RadioButton
            label="Other"
            value="other"
            selectedValue={gender}
            onChange={setGender}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center w-full">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 w-full bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StageThree: React.FC<StageThreeProps> = ({ setStage }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (bio.trim() === "") {
      setError("Bio cannot be empty.");
      return;
    }

    // Handle form submission or API call here
    console.log("Bio:", bio);

    // Proceed to the next stage
    setStage(3);
  };

  return (
    <div className="flex flex-col gap-8 px-3 py-3">
      <div className="flex w-full justify-center">
        <h1 className="font-bold text-lg font-sans text-white">
          How Would You Describe Yourself
        </h1>
      </div>

      <textarea
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 resize-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 bg-transparent"
        }`}
        rows={5}
        placeholder="Write a short bio about yourself..."
        aria-label="Bio"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
          setError("");
        }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-center w-full">
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StageFour: React.FC<StageThreeProps> = ({ setStage }) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prevSelectedHobbies) =>
      prevSelectedHobbies.includes(hobby)
        ? prevSelectedHobbies.filter((h) => h !== hobby)
        : [...prevSelectedHobbies, hobby]
    );
  };

  const handleNext = () => {
    // Handle form submission or move to the next stage
    console.log("Selected Hobbies:", selectedHobbies);
    setStage(4);
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-white font-bold font-sans text-2xl mb-6">
        Select Hobbies
      </h1>
      <div className="flex flex-wrap gap-4 w-full h-[300px] overflow-y-auto px-2 border-2 py-2 rounded-md border-gray-600">
        {hobbies.map((hobby, i) => {
          const isSelected = selectedHobbies.includes(hobby);
          return (
            <div
              key={i}
              onClick={() => toggleHobby(hobby)}
              aria-pressed={isSelected}
              className={`px-4 py-2 rounded-full transition-colors ease-in-out cursor-pointer font-sans font-bold text-white ${
                isSelected ? "bg-red-500" : "bg-gray-700"
              } hover:bg-opacity-75`}
            >
              {hobby}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white w-full rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StageFive: React.FC<StageThreeProps> = ({ setStage }) => {
  const [images, setImages] = useState<string[]>([]);
  const handleNext = () => {
    // Handle form submission or move to the next stage
  };

  return (
    <div className="px-2 py-3 flex flex-col items-center min-h-[80vh]">
      <h1 className="text-white text-lg font-bold font-sans">
        Let Us Know What You Look Like{" "}
      </h1>

      <SelectImages images={images} setImages={setImages} error="" />

      <div className="mt-2 flex justify-center w-full">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white w-full rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Stages = ({
  stage,
  userInfo,
  setStage,
}: {
  stage: number;
  userInfo: any;
  setStage: any;
}) => {
  const StageArr = [StageOne, StageTwo, StageThree, StageFour, StageFive];
  return (
    <div>
      {StageArr.map((Item, i) =>
        i === stage ? (
          <Item setStage={setStage} userInfo={userInfo} key={i} />
        ) : null
      )}
    </div>
  );
};

export default Stages;
