import React from "react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import HomeLayout from "../components/layouts/HomeLayout";
import DiaryLayout from "../components/layouts/DiaryLayout";

const DiaryHome = () => {
  return (
    <>
      <Header />
      <HomeLayout>
        <DiaryLayout
          calendarContent={<div>캘린더 섹션</div>}
          resultContent={<div>캘린더 결과 섹션</div>}
          diaryListContent={<div>다이어리 리스트 섹션</div>}
        />
      </HomeLayout>
      <Footer />
    </>
  );
};

export default DiaryHome;
