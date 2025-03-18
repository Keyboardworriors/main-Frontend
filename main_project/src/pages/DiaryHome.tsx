import React from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";
import MyTabs from "../components/common/tabs";

const DiaryHome = () => {
  return (
    <>
      <HomeLayout>
        <MyTabs />
        <DiaryLayout
          calendarContent={<div>캘린더 섹션</div>}
          resultContent={<div>캘린더 결과 섹션</div>}
          diaryListContent={<div>다이어리 리스트 섹션</div>}
        />
      </HomeLayout>
    </>
  );
};

export default DiaryHome;
