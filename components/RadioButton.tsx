interface RadioButtonProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selectedValue,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="gender"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton