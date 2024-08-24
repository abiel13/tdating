"use client";
import Image from "next/image";
import React, { useState } from "react";
import RadioButton from "./RadioButton";
import { hobbies } from "@/constants/hobbies";
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

// stage one creating user with telegram username and chatId
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
      console.log(newUser);

      const newUserPreference = await createPreference('66c90a2af205c7c023529830');
      console.log(newUserPreference);

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
          readOnly
          className="text-gray-400 font-sans mt-4 px-3 py-2 rounded-lg w-full bg-transparent border"
          value={userInfo.first_name + " " + userInfo.last_name || ""}
        />
      </div>

      <div>
        <h1 className="font-sans text-white font-bold text-lg">User Name</h1>
        <input
          type="text"
          readOnly
          name="username"
          className="text-gray-400 font-sans mt-4 px-3 py-2 rounded-lg w-full bg-transparent border"
          value={userInfo.username}
        />
      </div>

      {errorMsg && (
        <p className="font-sans font-medium capitalize mt-2 tex-lg text-red-600">
          {errorMsg}
        </p>
      )}
      <button
        onClick={handleNextStage}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

interface StageTwoProps {
  setStage: (stage: number) => void;
  userInfo: {
    first_name: string;
    username: string;
    photo_url?: string;
    id: string;
    last_name: string;
  };
}
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

const StageTwo: React.FC<StageTwoProps> = ({ setStage, userInfo }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Handle form submission, validation, etc.
    if (!dateOfBirth.length || !gender.length) {
      setErrorMsg("Please Fill Fields gender and date of birth");
      return;
    }

    if (validateAge(dateOfBirth)) {
      setErrorMsg(validateAge(dateOfBirth) as string);
      return;
    }

    const formData = {
      dateOfBirth,
      gender,
    };

    try {
      setLoading(true);
      setErrorMsg("");
      const updateUser = await updateUserByName(userInfo.username, formData);
      console.log(updateUser);
      setStage(2);
    } catch (error) {
      console.log(error);
      setErrorMsg("An Error occured while updating User");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 md:px-4 py-3 flex flex-col gap-4">
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
        <div className="flex items-center gap-6 flex-wrap ">
          <RadioButton
            label="Male"
            value="Male"
            selectedValue={gender}
            onChange={setGender}
          />
          <RadioButton
            label="Female"
            value="Female"
            selectedValue={gender}
            onChange={setGender}
          />{" "}
          <RadioButton
            label="Non Binary"
            value="Non-binary"
            selectedValue={gender}
            onChange={setGender}
          />
          <RadioButton
            label="Other"
            value="Other"
            selectedValue={gender}
            onChange={setGender}
          />
        </div>
      </div>
      {errorMsg && (
        <p className="text-red-500 capitalize font-light font-sans">
          {errorMsg}
        </p>
      )}

      <div className="mt-4 flex justify-center w-full ">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 w-full bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          {Loading ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

const StageThree: React.FC<StageThreeProps> = ({ setStage, userInfo }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (bio.trim() === "") {
      setError("Bio cannot be empty.");
      return;
    }

    // Handle form submission or API call here
    console.log("Bio:", bio);
    try {
      const updateUser = await updateUserByName(userInfo.username, {
        bio: bio,
      });
      console.log(updateUser);
      setStage(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    // Proceed to the next stage
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
          {Loading ? "Loading..." : "Next"}
        </button>
      </div>
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
    // Handle form submission or move to the next stage
    console.log("Selected Hobbies:", selectedHobbies);

    if (selectedHobbies.length < 5) {
      setErrorMsg("Select Up to Five Hobbies To Move On");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const updatedUser = await updateUserByName(userInfo.username, {
        interests: selectedHobbies,
      });
      console.log(updatedUser);
      setStage(4);
    } catch (error) {
      console.log(error);
      setErrorMsg("An Error occured adding hobbies please try again ");
    } finally {
      setLoading(false);
    }
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

      {errorMsg && (
        <p className="font-sans font-medium capitalize mt-2 tex-lg text-red-600">
          {errorMsg}
        </p>
      )}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white w-full rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          {loading ? "Loading...." : "Next"}
        </button>
      </div>
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
    // validation
    if (images.length < 2) {
      setErrorMsg("please add two or more pictures to proceed");
      return;
    }

    // Handle form submission or move to the set onboarded to true;

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
      setErrorMsg("An error occured updating personal images please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-3 flex flex-col items-center min-h-[80vh]">
      <h1 className="text-white text-lg font-bold font-sans">
        Let Us Know What You Look Like{" "}
      </h1>

      <SelectImages images={images} setImages={setImages} error="" />

      {errorMsg && (
        <p className="font-sans font-medium capitalize mt-2 tex-lg text-red-600">
          {errorMsg}
        </p>
      )}
      <div className="mt-2 flex justify-center w-full">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white w-full rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          {loading ? "Loading...." : "Next"}
        </button>
      </div>
    </div>
  );
};

// collection of onboarding stages displayed according to how far the user has progressed
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
    <div className="">
      {StageArr.map((Item, i) =>
        i === stage ? (
          <Item setStage={setStage} userInfo={userInfo} key={i} />
        ) : null
      )}
    </div>
  );
};

export default Stages;
