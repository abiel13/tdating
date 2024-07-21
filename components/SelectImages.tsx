import { imageToBase64 } from "@/lib/utils/utils";
import Image from "next/image";
import React, { useState } from "react";

const SelectImages = ({
  images,
  setImages,
  error,
}: {
  images: String[];
  setImages: any;
  error: string;
}) => {
  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    imageToBase64(e.target.files![0], (value: any) => {
      if (images[index]) {
        const updated = images.map((image, i) => (index == i ? value : image));
        setImages([...updated]);
        return;
      }

      setImages([...images, value]);
    });
  };

  return (
    <div className="w-full mt-12 flex flex-col gap-8">
      <div>
        <h1 className="text-white font-bold text-2xl">Select Images</h1>
        <p className="text-gray-400">
          select at least 3 images so dates know what you look like
        </p>
      </div>

      <div className=" px-3 py-4  border-dashed border-2  rounded-xl min-h-[230px] grid grid-cols-2 gap-x-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((item, i) => (
          <label
            key={i}
            className=" rounded-lg w-full mx-2 my-2 h-[300px] border-red-400 border border-dashed "
          >
            {images[i] ? (
              <div className="relative w-full h-full">
                <Image
                  src={images[i] as string}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                  fill
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlechange(e, i)}
                  className="w-0 h-0"
                />
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlechange(e, i)}
                className="w-0 h-0"
              />
            )}
          </label>
        ))}
      </div>
      {error.length && <p className="text-red-500 text-lg ">{error}</p>}
    </div>
  );
};

export default SelectImages;
