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
  const contentRef = useRef<HTMLDivElement>(null);

  // 탭 클릭 및 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const tabElements = document.querySelectorAll(".react-tabs__tab");

    const handleTabClick = () => {
      onClose();
    };

    tabElements.forEach((tab) => {
      tab.addEventListener("click", handleTabClick);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        event.target instanceof Node &&
        document.getElementById("top-level-modal-container")?.contains(event.target)
      ) {
        onClose();
      }
    };

    const checkSubMenuExists = () => {
      const subMenuContainer = document.querySelector(".top-bar-submenu-container");
      if (!subMenuContainer) {
        onClose();
      }
    };

    const subMenuCheckInterval = setInterval(checkSubMenuExists, 100);

    document.addEventListener("mousedown", handleClickOutside);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(subMenuCheckInterval);
      tabElements.forEach((tab) => {
        tab.removeEventListener("click", handleTabClick);
      });
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const topLevelModalContainer = document.getElementById("top-level-modal-container");
  if (!topLevelModalContainer) return null;

  return createPortal(
    <div
      className="rounded-xl bg-white w-full h-full p-10 inset-0 flex justify-center items-center pointer-events-auto"
      ref={modalRef}
    >
      <div className="bg-white w-full absolute inset-0 rounded-xl"></div>

      <div
        ref={contentRef}
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

            <div className="w-32 h-32 rounded-full border border-blue-300 overflow-hidden bg-blue-100 flex items-center justify-center text-blue-500 text-4xl ml-0 md:ml-30">
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
    topLevelModalContainer,
  );
}

export default ProfileModal;
