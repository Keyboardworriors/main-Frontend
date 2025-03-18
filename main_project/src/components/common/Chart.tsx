import React from "react";

// 차트화면 용 탭 인터페이스 정의
interface ChartComponentProps {
  periodType: "주간" | "월간" | "연간";
}

// 차트 컴포넌트 정의
const ChartComponent = ({ periodType }: ChartComponentProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        나의 감정 발자취{" "}
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">{periodType}</span>
      </h2>
      <div className="h-64">{/* chart.js 사용하여 실제 차트를 렌더링할 예정 */}</div>
    </div>
  );
};

export default ChartComponent;
