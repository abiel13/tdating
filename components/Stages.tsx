"use client";
import Image from "next/image";
import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { hobbiesarr } from "@/constants/hobbies";
import SelectImages from "./SelectImages";
import {
  createUser,
  getuserName,
  updateUserByName,
} from "@/lib/actions/user.actions";
import { validateAge } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/providers/user.provider";
import { createPreference } from "@/lib/actions/userprefrences.actions";

interface StageThreeProps {
  setStage: (stage: number) => void;
  userInfo: {
    first_name: string;
    username: string;
    photo_url?: string;
    id: string;
    last_name: string;
  };
}

const StageOne = ({
  userInfo,
  setStage,
}: {
  userInfo: {
    first_name: string;
    username: string;
    photo_url?: string;
    id: string;
    last_name: string;
  };
  setStage: (stage: number) => void;
}) => {
  const [image, setImage] = useState<string | null>(userInfo.photo_url || null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNextStage = async () => {
    const fullName = userInfo.first_name + " " + userInfo.last_name || "";
    try {
      setErrorMsg("");
      setLoading(true);
      const isUserExist = await getuserName(userInfo.username);
      if (isUserExist.length) {
        setStage(1);
        return;
      }
      const newUser = await createUser({
        username: userInfo.username,
        fullName,
        thumbnailUrl: image || "",
        telegramChatId: userInfo.id,
      });

      const newUserPreference = await createPreference(newUser.id);
      setStage(1);
    } catch (error) {
      setErrorMsg("Error Creating User Please Try Again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg shadow-lg w-[95%] md:w-[80%] mx-auto">
      <div className="flex items-center gap-6">
        <label className="h-20 w-20 rounded-full flex items-center justify-center bg-gray-800 cursor-pointer">
          {image ? (
            <Image
              src={image}
              alt="profile photo"
              width={80}
              height={80}
              className="rounded-full object-cover"
              priority
            />
          ) : (
            <Image
              src="/assets/profile.svg"
              alt="profile placeholder"
              width={30}
              height={30}
              className="object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <h1 className="text-white font-semibold text-lg">Full Name</h1>
        <input
          type="text"
          name="first_name"
          readOnly
          className="mt-2 px-4 py-2 w-full rounded-lg bg-gray-800 text-gray-400 border border-gray-700"
          value={userInfo.first_name + " " + userInfo.last_name || ""}
        />
      </div>

      <div>
        <h1 className="text-white font-semibold text-lg">Username</h1>
        <input
          type="text"
          name="username"
          readOnly
          className="mt-2 px-4 py-2 w-full rounded-lg bg-gray-800 text-gray-400 border border-gray-700"
          value={userInfo.username}
        />
      </div>

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      <button
        onClick={handleNextStage}
        className="mt-4 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

const StageTwo = ({
  setStage,
  userInfo,
}: {
  setStage: (stage: number) => void;
  userInfo: {
    first_name: string;
    username: string;
    photo_url?: string;
    id: string;
    last_name: string;
  };
}) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dateOfBirth || !gender) {
      setErrorMsg("Please fill out all fields");
      return;
    }

    if (validateAge(dateOfBirth)) {
      setErrorMsg(validateAge(dateOfBirth) as string);
      return;
    }

    const formData = { dateOfBirth, gender };

    try {
      setLoading(true);
      setErrorMsg("");
      await updateUserByName(userInfo.username, formData);
      setStage(2);
    } catch (error) {
      setErrorMsg("An error occurred while updating user information");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg shadow-lg w-[95%] md:w-[80%] mx-auto">
      <h1 className="text-white text-xl font-semibold text-center">
        Tell Us More About You
      </h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-gray-300 font-semibold">How Old Are You?</h2>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-gray-300 font-semibold">Select Gender</h2>
        <div className="flex items-center gap-6 flex-wrap">
          {["Male", "Female", "Non-binary", "Other"].map((option) => (
            <RadioButton
              key={option}
              label={option}
              value={option}
              selectedValue={gender}
              onChange={setGender}
            />
          ))}
        </div>
      </div>

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mt-4"
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

const StageThree: React.FC<StageThreeProps> = ({ setStage, userInfo }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (bio.trim() === "") {
      setError("Bio cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await updateUserByName(userInfo.username, { bio });
      setStage(3);
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 bg-gray-900 rounded-lg shadow-lg w-[95%] md:w-[80%] mx-auto">
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold">Describe Yourself</h1>
      </div>

      <textarea
        className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 text-gray-900 placeholder-gray-500 resize-none ${
          error
            ? "border-red-600 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
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

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleSubmit}
        className={`w-full py-3 mt-4 rounded-md text-white transition ${
          loading
            ? "bg-blue-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

const StageFour: React.FC<StageThreeProps> = ({ setStage, userInfo }) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);



  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prevSelectedHobbies) =>
      prevSelectedHobbies.includes(hobby)
        ? prevSelectedHobbies.filter((h) => h !== hobby)
        : [...prevSelectedHobbies, hobby]
    );
  };

  const handleNext = async () => {
    if (selectedHobbies.length < 5) {
      setErrorMsg("Select at least five hobbies to move on");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      await updateUserByName(userInfo.username, { interests: selectedHobbies });
      setStage(4);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "An error occurred while saving your hobbies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-900 rounded-lg shadow-lg md:w-[80%]  mx-auto">
      <h1 className="text-white text-2xl font-semibold text-center">
        Select Your Hobbies
      </h1>

      <div className="flex flex-wrap  gap-4 w-full h-[500px] md:h-[350px] overflow-y-auto px-2 border-2 py-4 rounded-md border-gray-600">
        {hobbiesarr.map((hobby) => {
          const isSelected = selectedHobbies.includes(hobby);
          return (
            <button
              key={hobby}
              onClick={() => toggleHobby(hobby)}
              aria-pressed={isSelected}
              className={`md:px-6 md:py-3 px-4 py-2 rounded-xl text-sm md:text-base  md:font-semibold transition-colors duration-200 !h-fit ${
                isSelected
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300"
              } hover:bg-opacity-80 focus:outline-none`}
            >
              {hobby}
            </button>
          );
        })}
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
      )}

      <button
        onClick={handleNext}
        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition focus:outline-none"
        disabled={loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

const StageFive: React.FC<StageThreeProps> = ({ setStage, userInfo }) => {
  const [images, setImages] = useState<string[]>([]);
  const { setUser } = useUserStore((state) => state);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (images.length < 2) {
      setErrorMsg("Please add at least two pictures to proceed.");
      return;
    }

    try {
      setErrorMsg("");
      setLoading(true);

      const updatedUser = await updateUserByName(userInfo.username, {
        profilePictures: images,
        onBoarded: true,
      });

      document.cookie = `flirtgram-user=${JSON.stringify({
        id: updatedUser.data._id,
        username: updatedUser.data.username,
      })}`;
      setUser({
        id: updatedUser.data._id,
        username: updatedUser.data.username,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "An error occurred while uploading images. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col items-center min-h-[80vh] ">
      <h1 className="text-white text-xl font-bold mb-4 text-center">
        Let Us Know What You Look Like
      </h1>

      <div className="w-full ">
        <SelectImages images={images} setImages={setImages} error={errorMsg} />
      </div>
      {errorMsg && (
        <p className="text-red-500 text-sm font-medium mt-2">{errorMsg}</p>
      )}

      <div className="mt-10 flex justify-center w-full">
        <button
          onClick={handleNext}
          className="w-full md:w-[80%] mx-auto py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Loading..." : "Finish"}
        </button>
      </div>
    </div>
  );
};

// Similarly modernize the remaining stages

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
    <div className=" mx-auto w-full">
      {StageArr.map((StageComponent, index) =>
        index === stage ? (
          <StageComponent key={index} setStage={setStage} userInfo={userInfo} />
        ) : null
      )}
    </div>
  );
};

export default Stages;
