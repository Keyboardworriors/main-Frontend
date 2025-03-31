import { useState, useRef, useEffect } from "react";
import TopBar from "./TopBar";
import ProfileModal from "./Modal/ProfileModal";
import CustomConfirmModal from "./Modal/CustomConfirmModal";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosFetcher } from "../../api/axiosFetcher";
import authApi from "../../api/authApi";

interface TopBarContainerProps {
  tabIndex: number;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  clearSearch: () => void;
  handleSearchInputRef: (el: HTMLInputElement | null) => void;
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

const TopBarContainer = ({
  tabIndex,
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  isSearching,
  clearSearch,
  handleSearchInputRef,
  handleSearch,
}: TopBarContainerProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { refreshToken, clearAuth } = useAuthStore.getState();
  const navigate = useNavigate();

  const [modalUser, setModalUser] = useState({
    nickname: "",
    profileImage: "",
    introduction: "",
    preferredGenres: [] as string[],
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenProfile = async () => {
    try {
      const res = await axiosFetcher.get<{
        profile_image: string;
        member: {
          nickname: string;
          introduce: string;
          favorite_genre: string[];
        };
      }>("api/members/profile/");

      setModalUser({
        nickname: res.member.nickname ?? "",
        profileImage: res.profile_image ?? "",
        introduction: res.member.introduce ?? "",
        preferredGenres: res.member.favorite_genre ?? [],
      });

      setIsProfileOpen(true);
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
      alert("프로필 정보를 불러오는데 실패했어요.");
    }
  };

  const handleLogout = async () => {
    try {
      if (!refreshToken) {
        alert("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
        return;
      }

      await authApi.logoutUser({ refresh_token: refreshToken });
      clearAuth();
      alert("로그아웃되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <TopBar
        tabIndex={tabIndex}
        showSearch={showSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        setShowSearch={setShowSearch}
        handleSearchInputRef={handleSearchInputRef}
        isSearching={isSearching}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        dropdownRef={dropdownRef}
        handleOpenProfile={handleOpenProfile}
        handleOpenLogoutConfirm={() => setShowLogoutModal(true)}
      />
      <CustomConfirmModal
        type="logout"
        title="로그아웃 하시겠습니까?"
        message="로그아웃하면 다시 로그인해야 해요"
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isDanger
        confirmText="로그아웃"
        cancelText="취소"
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={modalUser}
      />
    </>
  );
};

export default TopBarContainer;
