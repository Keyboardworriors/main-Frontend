import { useState } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/Calendar/Calendar";
import DiaryView from "./DiaryView";
import { SearchResult } from "../models/search";
import DiaryControl from "./DiaryControl"; // DiaryWrite 대신 DiaryControl 사용

interface DiaryHomeProps {
  searchQuery: string;
  searchResults: SearchResult[];
  onClearSearch: () => void;
}

const DiaryHome = ({ searchQuery = "", searchResults = [], onClearSearch }: DiaryHomeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isWriteMode, setIsWriteMode] = useState(false);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    onClearSearch();
  };

  const handleWriteClick = () => {
    setIsWriteMode(true);
  };

  const handleCancelWrite = () => {
    setIsWriteMode(false);
  };

  return (
    <HomeLayout>
      {isWriteMode && selectedDate ? (
        <DiaryControl selectedDate={selectedDate} onCancel={handleCancelWrite} />
      ) : (
        <DiaryLayout
          calendarContent={
            <MyCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          }
          resultContent={
            <DiaryView
              selectedDate={selectedDate}
              isSearchMode={searchQuery !== ""}
              searchResults={searchResults}
              onWriteClick={handleWriteClick}
            />
          }
        />
      )}
    </HomeLayout>
  );
};

export default DiaryHome;
