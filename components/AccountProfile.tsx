"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { isBase64Image } from "@/lib/utils/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { hobbies } from "@/constants/hobbies";

interface AccountProfileProps {
  btnTitle: string;
}

const AccountProfile = ({ btnTitle }: AccountProfileProps) => {
  const [Files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [hobby, setHobby] = useState<String[]>([]);

  const { startUpload } = useUploadThing("media");

  async function onSubmit(values: z.infer<typeof onboardingValidation>) {
    // const blob = values.profile_photo;

    // const hasImageChanged = isBase64Image(blob);

    // if (hasImageChanged) {
    //   const imgRes = await startUpload(Files);

    //   if (imgRes && imgRes[0].url) {
    //     values.profile_photo = imgRes[0].url;
    //   }
    // }
    router.push("/dashboard");
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
      profile_photo: "",
      name: "",
      bio: "",
      username: "",
    },
  });

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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        </div>

        <Button className="!bg-primary-500 font-semibold text-xl mb-3 font-sans">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
