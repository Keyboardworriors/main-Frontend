import React, { ReactNode, useState } from "react";

// 차트 화면용 탭 정의
interface ChartLayoutProps {
  chartContent: ReactNode;
  onTabChange?: (tab: "주간" | "월간" | "연간") => void; // 탭 변경시 호출할 함수
}

// 차트 레이아웃 컴포넌트 정의
const ChartLayout = ({ chartContent, onTabChange }: ChartLayoutProps) => {
  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState<"주간" | "월간" | "연간">("주간");

  // 탭 변경 핸들러 함수
  const handleTabChange = (tab: "주간" | "월간" | "연간") => {
    setActiveTab(tab); // 내부 상태 업데이트
    if (onTabChange) {
      onTabChange(tab); // props로 전달된 외부 핸들러 호출 (있는 경우에만)
    }
  };

  return (
    <div className="w-full">
      {/* 1200px 미만일 때 탭을 상단에 가로로 배치 */}
      <div className="xl:hidden w-full flex justify-center mb-6 border-b border-gray-200">
        {["주간", "월간", "연간"].map((tab) => (
          <button
            key={tab}
            className={`py-3 px-8 text-center font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange(tab as "주간" | "월간" | "연간")}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex w-full">
        {/* 1200px 이상일 때만 좌측에 세로 탭 표시 */}
        <div className="hidden xl:flex xl:flex-col border-r border-gray-200 pr-4 mr-4">
          {["주간", "월간", "연간"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 text-sm font-medium text-left whitespace-nowrap ${
                activeTab === tab ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(tab as "주간" | "월간" | "연간")}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 차트 컨텐츠 영역 */}
        <div className="flex-1 rounded-lg overflow-hidden">{chartContent}</div>
      </div>
    </div>
  );
};

export default ChartLayout;
