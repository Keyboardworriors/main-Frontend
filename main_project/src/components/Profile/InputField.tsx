import { InputFieldProps } from "../../models/profile";

function InputField({
  type,
  value,
  onChange,
  placeholder,
  disabled,
  maxLength,
  isError = false,
}: InputFieldProps) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={`mt-6 px-4 py-2 w-full border rounded-2xl focus:ring focus:ring-blue-300
        ${isError ? "border-red-500" : "border-[#A6CCF2]"}
        ${type === "email" ? "bg-gray-300 text-gray-600" : "bg-white"}`}
    />
  );
}

export default InputField;
