import { useState } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/Calendar/Calendar";
import DiaryView from "./DiaryView";

const DiaryHome = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <HomeLayout>
      <DiaryLayout
        calendarContent={
          <MyCalendar selectedDate={selectedDate} onDateSelect={(date) => setSelectedDate(date)} />
        }
        resultContent={<DiaryView selectedDate={selectedDate} />}
        diaryListContent={<div>다이어리 리스트 섹션</div>}
      />
    </HomeLayout>
  );
};

export default DiaryHome;
