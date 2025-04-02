import { FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../store/modal";
import { useDiaryStore } from "../../store/diary";

interface UserMenuProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleOpenProfile: () => void;
  handleOpenLogoutConfirm: () => void;
}

const UserMenu = ({
  showDropdown,
  setShowDropdown,
  dropdownRef,
  handleOpenProfile,
  handleOpenLogoutConfirm,
}: UserMenuProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const isWriting = useDiaryStore((state) => state.isWriting);

  const handleMyPageClick = () => {
    if (isWriting) {
      openModal("customConfirm", {
        title: "작성 중인 감정기록이 있어요!",
        message: "이동하면 작성 중인 내용이 사라질 수 있어요.\n정말 이동하시겠어요?",
        confirmText: "이동하기",
        cancelText: "취소",
        onConfirm: () => navigate("/members/mypage/"),
        onCancel: () => closeModal(),
      });
    } else {
      navigate("/members/mypage/");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 text-gray-700 hover:text-black focus:outline-none flex items-center gap-1 cursor-pointer"
      >
        <FaUserCircle size={20} />
        <span className="text-sm hidden md:inline">내 정보</span>
      </button>

      {showDropdown && (
        <div className="top-bar-submenu-container absolute right-0 top-full w-40 bg-white rounded-lg shadow-lg py-2 z-50 border-2 border-[#A6CCF2]">
          <button
            onClick={handleOpenProfile}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FaUser size={14} />
            <span>프로필</span>
          </button>

          <button
            onClick={handleMyPageClick}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FaUserCircle size={14} />
            <span>마이페이지</span>
          </button>

          <button
            onClick={handleOpenLogoutConfirm}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
          >
            <FaSignOutAlt size={14} />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
