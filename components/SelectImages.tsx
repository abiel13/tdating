import React from "react";

const SelectImages = () => {
  return (
    <div className="w-full mt-12 flex flex-col gap-8">
      <div>
        <h1 className="text-white font-bold text-2xl">Select Images</h1>
        <p className="text-gray-400">
          {" "}
          select at least 3 images so dates know what you look like
        </p>
      </div>

      <div className=" px-3 py-4  border-dashed border-2  rounded-xl min-h-[230px] grid grid-cols-2 gap-x-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((item, i) => (
          <label className=" rounded-lg w-full mx-2 my-2 h-[300px] border-red-400 border border-dashed">
            <input type="file" accept="image" className="w-0 h-0" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectImages;
