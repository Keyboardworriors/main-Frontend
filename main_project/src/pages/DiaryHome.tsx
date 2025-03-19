import React from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyCalendar from "../components/common/Calendar";

const DiaryHome = () => {
  return (
    <>
      <HomeLayout>
        <DiaryLayout
          calendarContent={<MyCalendar />}
          resultContent={<div>캘린더 결과 섹션</div>}
          diaryListContent={<div>다이어리 리스트 섹션</div>}
        />
      </HomeLayout>
    </>
  );
};

export default DiaryHome;
