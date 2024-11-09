'use client'
import React, { useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange }) => {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
      />
      <div className="flex justify-between w-full mt-1 text-xs text-gray-400">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Slider;
