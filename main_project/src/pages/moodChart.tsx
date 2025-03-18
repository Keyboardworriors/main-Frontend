import React, { useState, useCallback } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import ChartLayout from "../components/layouts/ChartLayout";
import ChartComponent from "../components/common/Chart";

// 차트 페이지 컴포넌트 정의
const MoodChart = () => {
  // 현재 활성화된 탭 상태 관리, 기본값 주간
  const [activeTab, setActiveTab] = useState<"주간" | "월간" | "연간">("주간");

  // 탭 변경 핸들러
  const handleTabChange = useCallback((tab: "주간" | "월간" | "연간") => {
    setActiveTab(tab); // 활성 탭 상태 업데이트
  }, []);

  return (
    <HomeLayout>
      <ChartLayout
        onTabChange={handleTabChange} // 탭 변경 핸들러 전달
        chartContent={<ChartComponent periodType={activeTab} />}
      />
    </HomeLayout>
  );
};

export default MoodChart;
