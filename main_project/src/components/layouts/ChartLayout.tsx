import React, { useState } from "react";
import { PeriodType, ChartLayoutProps } from "../../models/type";
import { PERIOD_TYPES } from "../../models/constants";

const ChartLayout = ({ chartContent, onTabChange }: ChartLayoutProps) => {
  const [activeTab, setActiveTab] = useState<PeriodType>(PeriodType.WEEKLY);

  const handleTabChange = (tab: PeriodType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full">
      {/* 1200px 미만일 때 탭을 상단에 가로로 배치 */}
      <div className="xl:hidden w-full flex justify-center mb-6 border-b border-gray-200">
        {PERIOD_TYPES.map((tab) => (
          <button
            key={tab}
            className={`py-3 px-8 text-center font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex w-full">
        {/* 1200px 이상일 때만 좌측에 세로 탭 표시 */}
        <div className="hidden xl:flex xl:flex-col border-r border-gray-200 pr-4 mr-4">
          {PERIOD_TYPES.map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 text-sm font-medium text-left whitespace-nowrap ${
                activeTab === tab ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(tab)}
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
