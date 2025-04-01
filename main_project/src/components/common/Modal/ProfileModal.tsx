import { FaHeart, FaPen } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  if (!isOpen) return null;

  const topLevelModalContainer = document.getElementById("top-level-modal-container");
  if (!topLevelModalContainer) return null;

  return createPortal(
    <div className="rounded-xl bg-white w-full h-full p-10 inset-0 flex justify-center items-center pointer-events-auto">
      <div className="bg-white w-full absolute inset-0 rounded-xl"></div>
      
      <div
        ref={modalRef}
        className="relative flex flex-col items-center"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex justify-center items-center min-h-[400px] px-8 max-w-5xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            aria-label="닫기"
          >
            ✕
          </button>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 mr-0 md:mr-12">
              <h2 className="text-4xl font-bold mb-10">{user.nickname || "닉네임"}</h2>

              <div className="flex items-center text-lg">
                <FaHeart className="mr-4 text-gray-500" />
                <span>{user.preferredGenres?.join(", ") || "-"}</span>
              </div>

              <div className="flex items-center text-base">
                <FaPen className="mr-4 text-gray-500" />
                <span>{user.introduction || "-"}</span>
              </div>
            </div>

            <div className="w-32 h-32 rounded-full border border-blue-300 overflow-hidden bg-blue-100 flex items-center justify-center text-blue-500 text-4xl ml-30">
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
        </div>
      </div>
    </div>,
    topLevelModalContainer
  );
}

export default ProfileModal;