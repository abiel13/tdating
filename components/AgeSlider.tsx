import React, { SetStateAction, useState } from 'react';

interface AgeSliderI {
    min:number,
    max:number,
    setMin:(value:number) => void
    setMax:(value:number) => void
}

const AgeRangeSlider = ({min, max, setMin, setMax} : AgeSliderI) => {
  // State to hold the min and max age


  // Handle the change for min age
  const handleMinChange = (event:any) => {
    const value = Math.min(Number(event.target.value), max - 1); // Ensure min age is less than max
    setMin(value);
  };

  // Handle the change for max age
  const handleMaxChange = (event:any) => {
    const value = Math.max(Number(event.target.value), min + 1); // Ensure max age is greater than min
    setMax(value);
  };

  return (
    <div className="w-full mt-7">
      <div className="w-full ">
        <div className="flex items-center w-full bg-gray-700 h-[8.2px] ">
          <input
            type="range"
            min="18"
            max="100"
            value={min}
            onChange={handleMinChange}
            className="flex-1 !rounded--none appearance-none bg-transparent"
          />
          <input
            type="range"
            min="18"
            max="100"
            value={max}
            onChange={handleMaxChange}
            className="flex-1 appearance-none bg-transparent"
            style={{ zIndex: '1' }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>Min: {min}</span>
          <span>Max: {max}</span>
        </div>
      </div>
    </div>
  );
};

export default AgeRangeSlider;
