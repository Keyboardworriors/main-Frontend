import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";
import { useState, useRef, useEffect, RefObject } from "react";
import ProfileModal from "./Modal/ProfileModal";
import { axiosFetcher } from "../../api/axiosFetcher";
import { useSearch } from "../../hooks/useSearch";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

function MyTabs() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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
          <SearchBar
            showSearch={showSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            setShowSearch={setShowSearch}
            handleSearchInputRef={handleSearchInputRef}
            isSearching={isSearching}
          />
          <UserMenu
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            dropdownRef={dropdownRef as RefObject<HTMLDivElement>}
            handleOpenProfile={handleOpenProfile}
          />
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
