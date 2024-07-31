"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingValidation } from "@/lib/validations/onboarding";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { getLocation, isBase64Image, validateAge } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { hobbies } from "@/constants/hobbies";
import { getGeoLocation } from "@/lib/location";
import SelectImages from "./SelectImages";
import { createUser } from "@/lib/actions/user.actions";
import DatePicker from "./DatePicker";
import GenderSelectComponent from "./GenderSelect";
import { useUserStore } from "@/providers/user.provider";

interface AccountProfileProps {
  btnTitle: string;
  userInfo: any;
}

const AccountProfile = ({ btnTitle, userInfo }: AccountProfileProps) => {
  const [Files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [coordinates, setcoordinates] = useState<any>();
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");
  const [hobby, setHobby] = useState<string[]>([]);
  const { setUser } = useUserStore((state) => state);
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<string | null>("");
  const [additionalError, setAdditionalError] = useState({
    hobbies: "",
    displayImages: "",
    gender: "",
    dateOfBirth: "",
  });

  async function onSubmit(values: z.infer<typeof onboardingValidation>) {
    if (hobby.length < 5) {
      setAdditionalError({
        ...additionalError,
        hobbies: "Must Select at least 5 hobbies",
      });
      return;
    }
    if (validateAge(date!)) {
      setAdditionalError({
        ...additionalError,
        dateOfBirth: validateAge(date!) || "",
      });
      return;
    }
    if (images.length < 3) {
      setAdditionalError({
        ...additionalError,
        displayImages: "Must Select at least 3 images",
      });
      return;
    }
    if (!selectedGender.length) {
      setAdditionalError({
        ...additionalError,
        gender: "gender is a required field",
      });
      return;
    }

    setAdditionalError({
      hobbies: "",
      displayImages: "",
      gender: "",
      dateOfBirth: "",
    });
    try {
      setLoading(true);
      const newUser = await createUser({
        username: values.username,
        fullName: values.name,
        dateOfBirth: date!,
        gender: selectedGender,
        interests: hobby,
        bio: values.bio,
        profilePictures: [values.profile_photo, ...images],
        location: {
          type: "Point",
          coordinates: [coordinates.latitude, coordinates.longitude],
        },
        telegramChatId: userInfo.id,
      });

      document.cookie = `flirtgram-user=${JSON.stringify({
        id: newUser.id,
        username: newUser.username,
        location: newUser.location,
      })}`;
      setUser({
        id: newUser.id,
        username: newUser.username,
        location: newUser.location,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      fileReader.onload = async (event: any) => {
        const imageDataUrl = event?.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const form = useForm({
    resolver: zodResolver(onboardingValidation),
    defaultValues: {
      profile_photo: userInfo.photo_url || "",
      name: `${userInfo.first_name} ${userInfo.last_name}` || "",
      bio: "",
      username: userInfo.username || "",
    },
  });

  useEffect(() => {
    (async function () {
      try {
        const location = await getLocation();
        setcoordinates(location);
        // Use the location object as needed
        const getGeo = await getGeoLocation(
          location?.latitude,
          location.longitude
        );

        setLocation(getGeo);
      } catch (error) {
        console.error("Error getting location:", error);
        // Handle the error message appropriately, e.g., display it to the user
      }
    })();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="  flex items-center gap-4">
              <FormLabel className=" flex h-24 w-24 items-center justify-center rounded-full bg-gray-300/10">
                {field.value.length ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    className=" rounded-full object-contain"
                    priority
                  />
                ) : (
                  <Image
                    src={"/assets/profile.svg"}
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object_contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  placeholder="upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex-col  flex justify-start   gap-4">
              <FormLabel className="!text-white text-base-semibold text-xl font-sans">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="py-4 rounded-md px-3 text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex-col  flex justify-start   gap-4 ">
              <FormLabel className="text-white font-bold text-xl font-sans">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="py-4 rounded-md px-3 text-gray-100"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="font-bold text-white mb-2">Select Date of Birth</h2>
          <DatePicker date={date!} setDate={setDate} />
          {additionalError.dateOfBirth && (
            <p className="text-red-500 font-bold">
              {additionalError.dateOfBirth}
            </p>
          )}
        </div>
        <GenderSelectComponent
          selectedGender={selectedGender}
          error={additionalError.gender}
          setSelectedGender={setSelectedGender}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full flex-col  flex justify-start   gap-4">
              <FormLabel className="text-white font-bold text-xl font-sans">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  rows={10}
                  className="py-4 rounded-md px-3 text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h1 className="font-bold text-white font-sans text-3xl">
            Location:{" "}
          </h1>
          <p className="text-white font-bold text-xl">{location}</p>
        </div>
        <div>
          <h1 className="text-white font-bold font-sans text-2xl">
            Select Hobbies
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            {hobbies.map((item, i) => {
              const isHobby = hobby.includes(item);
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (isHobby) {
                      const idx = hobby.findIndex((a) => a == item);
                      hobby.splice(idx, 1);
                      setHobby([...hobby]);
                      return;
                    }
                    setHobby([...hobby, item]);
                  }}
                  className={`${
                    isHobby ? "bg-red-400" : "bg-gray-300/10"
                  } px-4 rounded-full py-2  transition-colors ease-in cursor-pointer text-white font-sans font-bold `}
                >
                  <h1 className="text-white">{item}</h1>
                </div>
              );
            })}
          </div>
          {additionalError.hobbies.length && (
            <p className="text-red-500 font-bold">{additionalError.hobbies}</p>
          )}
        </div>
        <SelectImages
          images={images}
          setImages={setImages}
          error={additionalError.displayImages}
        />
        <Button
          disabled={loading}
          className="!bg-primary-500 font-semibold text-xl mb-3 font-sans capitalize"
        >
          {loading ? "loading" : "submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
