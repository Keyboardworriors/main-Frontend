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
      <div className="relative bg-white rounded-xl p-8 sm:p-10 max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 mr-0 md:mr-10 w-full md:w-auto">
          <h2 className="text-3xl font-bold mb-2">{user.nickname || "닉네임"}</h2>

          <div className="flex items-start md:items-center gap-2 flex-wrap text-lg w-full">
            <FaHeart className="text-gray-500 mr-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1">
              {user.preferredGenres?.length ? (
                user.preferredGenres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm text-center whitespace-nowrap"
                  >
                    {genre}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">-</span>
              )}
            </div>
          </div>

          <div className="flex items-center text-base mt-4">
            <FaPen className="mr-4 text-gray-500" />
            <span>{user.introduction || "-"}</span>
          </div>
        </div>

        <div className="w-28 h-28 sm:w-32 sm:h-32 self-center md:self-start rounded-full border border-blue-300 overflow-hidden bg-blue-100 flex items-center justify-center text-blue-500 text-4xl">
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
