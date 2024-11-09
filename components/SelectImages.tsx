import { imageToBase64 } from "@/lib/utils/utils";
import Image from "next/image";
import React from "react";
import { PlusCircleIcon } from "lucide-react";

interface SelectImagesProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  error: string;
}

const SelectImages: React.FC<SelectImagesProps> = ({ images, setImages, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      imageToBase64(e.target.files[0], (base64Image: string) => {
        if (images[index]) {
          const updatedImages = images.map((img, i) => (i === index ? base64Image : img));
          setImages(updatedImages);
        } else {
          setImages([...images, base64Image]);
        }
      });
    }
  };

  return (
    <div className="w-full mt-12 flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="text-white font-bold text-2xl">Select Images</h1>
        <p className="text-gray-400">Select at least 3 images so dates know what you look like.</p>
      </div>

      <div className="px-3 py-4 border-dashed border-2 rounded-xl grid grid-cols-2 gap-6 md:grid-cols-3 w-[95%] md:w-[80%]">
        {Array.from({ length: 6 }).map((_, i) => (
          <label
            key={i}
            className={`relative rounded-lg w-full h-[120px] bg-gray-800 border-2 border-dashed border-gray-500 hover:border-blue-500 transition-all duration-300 ease-in-out ${
              images[i] ? "" : "flex items-center justify-center"
            }`}
          >
            {images[i] ? (
              <Image
                src={images[i]}
                alt={`Selected image ${i + 1}`}
                className="w-full h-full rounded-lg object-cover shadow-md"
                fill
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <PlusCircleIcon className="w-10 h-10 mb-1" />
                <span className="text-sm font-semibold">Add Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, i)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label={`Upload image ${i + 1}`}
            />
          </label>
        ))}
      </div>


    </div>
  );
};

export default SelectImages;
