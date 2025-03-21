import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { User } from "../../models/type";

function MyTabs() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 임시 사용자 데이터
  const user: User = {
    id: "1",
    nickname: "김민정",
    email: "hong@example.com",
    profile_image: "",
    introduce: "안녕하세요, 김민정입니다.",
    favorite_genre: "팝, 록, 힙합",
  };

  // 검색어 초기화 함수
  const clearSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 검색창이 나타날 때 자동으로 포커스
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 검색 실행 시 검색창을 닫지 않도록 수정
      // setShowSearch(false);
    }
  };

  return (
    <Tabs
      className="bg-[#A6CCF2] min-h-screen flex flex-col"
      defaultIndex={0}
      onSelect={(index) => console.log(`Selected tab: ${index}`)}
    >
      <TabList className="flex max-w-[1130px] w-full mx-auto pt-0 pr-4 pl-7 items-center">
        <Tab
          className="px-4 py-3 text-gray-700 hover:text-black focus:outline-none whitespace-nowrap text-sm"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정일기
        </Tab>
        <Tab
          className="px-4 py-3 text-gray-700 hover:text-black focus:outline-none whitespace-nowrap text-sm"
          selectedClassName="text-black font-bold bg-white rounded-t-lg"
        >
          나의 감정발자취
        </Tab>
        <div className="flex items-center gap-2 ml-auto">
          {showSearch ? (
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="일기를 검색해보세요!"
                className="px-4 py-2 bg-white rounded-full focus:outline-none text-gray-700 text-sm placeholder:text-sm placeholder-gray-500 w-40 md:w-64"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
            >
              <FaSearch size={18} />
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none flex items-center gap-1"
            >
              <FaUserCircle size={20} />
              <span className="text-sm hidden md:inline">{user.nickname}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full w-40 bg-white rounded-lg shadow-lg py-2 z-50 border-2 border-[#A6CCF2]">
                <button
                  onClick={() => console.log("프로필 페이지로 이동")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaUser size={14} />
                  <span>프로필</span>
                </button>
                <button
                  onClick={() => console.log("마이페이지로 이동")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaUserCircle size={14} />
                  <span>마이페이지</span>
                </button>
                <button
                  onClick={() => console.log("로그아웃")}
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
          <DiaryHome searchQuery={searchQuery} onClearSearch={clearSearch} />
        </TabPanel>
        <TabPanel>
          <MoodChart />
        </TabPanel>
      </div>
    </Tabs>
  );
}

export default MyTabs;
