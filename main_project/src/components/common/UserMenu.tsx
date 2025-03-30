import { FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        <div className="absolute right-0 top-full w-40 bg-white rounded-lg shadow-lg py-2 z-50 border-2 border-[#A6CCF2]">
          <button
            onClick={handleOpenProfile}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FaUser size={14} />
            <span>프로필</span>
          </button>
          <button
            onClick={() => navigate("/members/mypage/")}
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
