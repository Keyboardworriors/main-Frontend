import { FC } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const StartButton: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className="flex justify-center mt-[100px] mb-[100px]">
      <button
        onClick={onClick}
        className="px-6 py-3 bg-blue-400 text-white text-lg rounded-3xl hover:bg-blue-500"
      >
        {text}
      </button>
    </div>
  );
};

export default StartButton;

