import BaseModal from "./BaseModal";
import { FaHeart, FaPen } from "react-icons/fa";

interface User {
  nickname: string;
  profileImage?: string;
  introduction?: string;
  preferredGenres?: string[];
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col md:flex-row justify-center items-center md:items-start min-h-screen px-8 max-w-5xl w-full gap-6 text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:mr-12">
          <h2 className="text-3xl font-bold">{user.nickname || "닉네임"}</h2>

          <div className="flex items-center text-lg">
            <FaHeart className="mr-2 text-gray-500" />
            <span>{user.preferredGenres?.join(", ") || "-"}</span>
          </div>

          <div className="flex items-center text-base">
            <FaPen className="mr-2 text-gray-500" />
            <span>{user.introduction || "-"}</span>
          </div>
        </div>

        <div className="w-32 h-32 rounded-full border border-blue-300 overflow-hidden bg-blue-100 flex items-center justify-center text-blue-500 text-4xl">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{user.nickname?.charAt(0).toUpperCase() || "U"}</span>
          )}
        </div>
      </div>
    </BaseModal>
  );
}

export default ProfileModal;
