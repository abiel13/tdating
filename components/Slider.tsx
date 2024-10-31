'use client'
import React, { useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
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
