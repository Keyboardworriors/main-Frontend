import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./Modal/ProfileModal";
import { axiosFetcher } from "../../api/axiosFetcher";
import { useSearch } from "../../hooks/useSearch";

function MyTabs() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    clearSearch,
    handleSearchInputRef,
    handleSearch,
  } = useSearch();

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
      console.log("프로필 API 응답:", res);

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

  return (
    <Tabs className="bg-[#A6CCF2] min-h-screen flex flex-col" defaultIndex={0}>
      <TabList className="flex max-w-[1130px] w-full mx-auto pt-0 pr-4 pl-7 items-center">
        <Tab
          className="px-4 py-3 text-gray-700 hover:text-black focus:outline-none whitespace-nowrap text-sm cursor-pointer"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정일기
        </Tab>
        <Tab
          className="px-4 py-3 text-gray-700 hover:text-black focus:outline-none whitespace-nowrap text-sm cursor-pointer"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정발자취
        </Tab>
        <div className="flex items-center gap-2 ml-auto">
          {showSearch ? (
            <div className="relative flex items-center">
              <input
                ref={handleSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="일기를 검색해보세요!"
                className="px-4 py-2 bg-white rounded-full focus:outline-none text-gray-700 text-sm placeholder:text-sm placeholder-gray-500 w-40 md:w-64"
                disabled={isSearching}
              />
              <button
                onClick={clearSearch}
                className="absolute right-2 text-gray-500 hover:text-gray-700"
                aria-label="검색창 닫기"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none cursor-pointer"
              aria-label="검색창 열기"
            >
              <FaSearch size={18} />
            </button>
          )}
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
                  onClick={() => navigate("api/members/mypage/")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaUserCircle size={14} />
                  <span>마이페이지</span>
                </button>
                <button
                  onClick={() => {
                    // TODO: 로그아웃 기능 구현
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt size={14} />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </TabList>
      <div className="w-full max-w-[1130px] mx-auto">
        <TabPanel>
          <DiaryHome
            searchQuery={searchQuery}
            searchResults={searchResults}
            onClearSearch={clearSearch}
          />
        </TabPanel>
        <TabPanel>
          <MoodChart />
        </TabPanel>
      </div>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={modalUser}
      />
    </Tabs>
  );
}

export default MyTabs;
