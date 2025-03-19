import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Chart.js 설정
ChartJS.register(ArcElement, Tooltip, Legend);

// 차트화면용 탭 타입 정의
interface ChartComponentProps {
  periodType: "주간" | "월간" | "연간";
}

// 감정 데이터 타입 정의
interface EmotionData {
  label: string; // 감정 키워드
  value: number; // 감정 수치
  color: string; // 차트에 표시될 색상
}

// 차트 컴포넌트 정의
const ChartComponent = ({ periodType }: ChartComponentProps) => {
  // 감정 데이터 상태 관리
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);

  // 데이터 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // Chart.js 필수 데이터 형식
  const chartData = {
    labels: emotionData.map((item) => item.label),
    datasets: [
      {
        // 조각별
        data: emotionData.map((item) => item.value),
        backgroundColor: emotionData.map((item) => item.color),
      },
    ],
  };

  // Chart.js 옵션 객체
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // 범례 설정
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      // 툴팁 설정
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}회`;
          },
        },
      },
    },
  };

  // 테스트용 더미 데이터
  const generateDummyData = (type: "주간" | "월간" | "연간") => {
    // 차트 색상 임의로 지정
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8AC249",
      "#EA5545",
      "#F46A9B",
      "#87BC45",
    ];

    // 테스트용 각 기간 타입별 더미 데이터
    if (type === "주간") {
      return [
        { label: "행복", value: 12, color: colors[0] },
        { label: "슬픔", value: 5, color: colors[1] },
        { label: "불안", value: 8, color: colors[2] },
        { label: "분노", value: 3, color: colors[3] },
        { label: "평온", value: 7, color: colors[4] },
      ];
    } else if (type === "월간") {
      return [
        { label: "행복", value: 45, color: colors[0] },
        { label: "슬픔", value: 23, color: colors[1] },
        { label: "불안", value: 30, color: colors[2] },
        { label: "분노", value: 15, color: colors[3] },
        { label: "평온", value: 38, color: colors[4] },
        { label: "지루함", value: 20, color: colors[5] },
      ];
    } else {
      return [
        { label: "행복", value: 210, color: colors[0] },
        { label: "슬픔", value: 145, color: colors[1] },
        { label: "불안", value: 175, color: colors[2] },
        { label: "분노", value: 80, color: colors[3] },
        { label: "평온", value: 230, color: colors[4] },
        { label: "지루함", value: 120, color: colors[5] },
        { label: "설렘", value: 95, color: colors[6] },
        { label: "후회", value: 65, color: colors[7] },
      ];
    }
  };

  // 탭 변경 시 데이터 업데이트
  useEffect(() => {
    setLoading(true);

    // 더미 데이터 생성
    const newData = generateDummyData(periodType);

    // 로딩 딜레이 .5초 API 연결 후 삭제 예정
    setTimeout(() => {
      setEmotionData(newData);
      setLoading(false);
    }, 500);
  }, [periodType]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        나의 감정 발자취{" "}
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">{periodType}</span>
      </h2>
      <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-8 mb-6">
        {/* 차트 영역 */}
        <div className="w-full xl:col-span-2 h-72 md:h-80 relative p-5 bg-white rounded-lg">
          {loading ? (
            // 로딩 영역
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">데이터 로딩 중...</p>
            </div>
          ) : (
            // 차트 렌더링
            <Doughnut data={chartData} options={chartOptions} />
          )}
        </div>

        {/* 감정 키워드 요약 정보 */}
        {!loading && (
          <div className="mt-6 xl:mt-0 bg-gray-50 p-6 rounded-lg max-w-full">
            <h3 className="text-lg font-medium mb-4">나의 감정 요약</h3>
            <p className="text-sm text-gray-600 mb-4">
              {periodType} 동안 가장 많이 느낀 감정은{" "}
              <strong>
                {/* 값이 가장 큰 감정 찾기 */}
                {emotionData.length > 0
                  ? emotionData.sort((a, b) => b.value - a.value)[0].label
                  : ""}
              </strong>
              입니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-3 text-sm">
              {/* 모든 감정 키워드 표시 */}
              {emotionData.map((emotion) => (
                <div key={emotion.label} className="flex items-center p-2 rounded-md transition">
                  {/* 감정 색상 표시 원 */}
                  <span
                    className="w-4 h-4 mr-2 rounded-full"
                    style={{ backgroundColor: emotion.color }}
                  ></span>
                  {/* 감정 이름과 횟수 */}
                  <span className="text-gray-700">
                    {emotion.label}: {emotion.value}회
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
