import { useState } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/Calendar/Calendar";
import DiaryView from "./DiaryView";
import { SearchResult } from "../models/type";

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
    setIsWriteMode(false);
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
      <DiaryLayout
        calendarContent={<MyCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />}
        resultContent={
          <DiaryView
            selectedDate={selectedDate}
            isSearchMode={searchQuery !== ""}
            searchResults={searchResults}
          />
        }
      />
    </HomeLayout>
  );
};

export default DiaryHome;
