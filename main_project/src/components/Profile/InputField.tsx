import { InputFieldProps } from "../../models/type";

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`mt-5 px-4 py-2 w-full border border-[#A6CCF2] rounded-2xl focus:ring focus:ring-blue-300
        ${type === "email" ? "bg-gray-300 text-gray-600" : "bg-white"}`}
    />
  );
};

export default InputField;
