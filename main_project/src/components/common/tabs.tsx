import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DiaryHome from "../../pages/DiaryHome";
import MoodChart from "../../pages/moodChart";
import TopBarContainer from "./TopBarContainer";
import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";
import { useDiaryStore } from "../../store/diary";
import { useModalStore } from "../../store/modal";

function MyTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  const {
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,
    isSearching,
    clearSearch,
    handleSearchInputRef,
    handleSearch,
    searchResults,
  } = useSearch();

  const tabBaseStyle =
    "px-4 py-3 bg-[#F0F4F8] text-gray-700 hover:text-black focus:outline-none whitespace-nowrap text-sm cursor-pointer rounded-t-lg";
  const tabSelectedStyle = "text-black font-bold bg-white rounded-t-lg";

  return (
    <Tabs
      className="bg-[#A6CCF2] min-h-screen flex flex-col"
      selectedIndex={tabIndex}
      onSelect={(index) => {
        const { isWriting } = useDiaryStore.getState();
        console.log("🔍 탭 이동 시도 - isWriting 상태:", isWriting);
        const { openModal } = useModalStore.getState();

        if (isWriting) {
          openModal("customConfirm", {
            title: "작성 중인 감정기록이 있어요!",
            message: "이동하면 작성 중인 내용이 사라질 수 있어요.\n정말 이동하시겠어요?",
            onConfirm: () => setTabIndex(index),
            onCancel: () => {},
            confirmText: "이동하기",
            cancelText: "취소",
            isDanger: true,
          });
          return false;
        }

        setTabIndex(index);
        return true;
      }}
    >
      <TabList className="flex max-w-[1130px] w-full mx-auto pt-0 pr-4 pl-7 items-center">
        <Tab className={tabBaseStyle} selectedClassName={tabSelectedStyle}>
          나의 감정기록
        </Tab>
        <Tab className={tabBaseStyle} selectedClassName={tabSelectedStyle}>
          나의 감정발자취
        </Tab>
        <TopBarContainer
          tabIndex={tabIndex}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          clearSearch={clearSearch}
          handleSearchInputRef={handleSearchInputRef}
          handleSearch={handleSearch}
        />
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
    </Tabs>
  );
}

export default MyTabs;
