import { InputFieldProps } from "../../models/profile";

function InputField({ type, value, onChange, placeholder, disabled }: InputFieldProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`mt-6 px-4 py-2 w-full border border-[#A6CCF2] rounded-2xl focus:ring focus:ring-blue-300
        ${type === "email" ? "bg-gray-300 text-gray-600" : "bg-white"}`}
    />
  );
}

export default InputField;
