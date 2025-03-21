import { useState } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/Calendar/Calendar";
import DiaryView from "./DiaryView";

interface DiaryHomeProps {
  searchQuery?: string;
  onClearSearch: () => void;
}

const DiaryHome = ({ searchQuery = "", onClearSearch }: DiaryHomeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    onClearSearch();
  };

  return (
    <HomeLayout>
      <DiaryLayout
        calendarContent={<MyCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />}
        resultContent={<DiaryView selectedDate={selectedDate} searchQuery={searchQuery} />}
      />
    </HomeLayout>
  );
};

export default DiaryHome;
