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
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-gray-200 mb-4 md:mb-0 md:pr-4 md:mr-4">
          {/* 탭 버튼들을 배열로부터 생성 */}
          {["주간", "월간", "연간"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-4 text-sm font-medium text-left ${
                // 활성화된 탭은 blue, 비활성화된 탭은 gray
                activeTab === tab ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(tab as "주간" | "월간" | "연간")} // 탭 클릭 핸들러
            >
              {tab} {/* 탭 텍스트 표시 */}
            </button>
          ))}
        </div>

        <div className="flex-1 rounded-lg">{chartContent}</div>
      </div>
    </div>
  );
};

export default ChartLayout;
