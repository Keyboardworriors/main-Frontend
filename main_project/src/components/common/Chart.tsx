import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PeriodType, EmotionData, ChartComponentProps } from "../../models/type";
import { useModalStore } from "../../store/modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ periodType }: ChartComponentProps) => {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { openModal, closeModal } = useModalStore();

  // Chart.js 필수 데이터 형식
  const chartData = {
    labels: emotionData.map((item) => item.label),
    datasets: [
      {
        data: emotionData.map((item) => item.value),
        backgroundColor: emotionData.map((item) => item.color),
      },
    ],
  };

  // Chart.js 옵션 객체
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
  const generateDummyData = (type: PeriodType) => {
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

    if (type === PeriodType.WEEKLY) {
      return [
        { label: "행복", value: 12, color: colors[0] },
        { label: "슬픔", value: 5, color: colors[1] },
        { label: "불안", value: 8, color: colors[2] },
        { label: "분노", value: 3, color: colors[3] },
        { label: "평온", value: 7, color: colors[4] },
      ];
    } else if (type === PeriodType.MONTHLY) {
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

  useEffect(() => {
    setLoading(true);
    openModal("loading", { message: "차트를 분석중이에요" });

    const newData = generateDummyData(periodType);

    // API 연결 후 삭제 예정
    setTimeout(() => {
      setEmotionData(newData);
      setLoading(false);
      closeModal();
    }, 1500);
  }, [periodType, openModal, closeModal]);

  const getMostFrequentEmotion = () => {
    if (emotionData.length === 0) return "";

    const sortedData = [...emotionData].sort((a, b) => b.value - a.value);
    return sortedData[0].label;
  };

  // 기존 렌더링 코드 유지
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        나의 감정 발자취{" "}
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">{periodType}</span>
      </h2>
      <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-8 mb-6">
        <div className="w-full xl:col-span-2 h-72 md:h-80 relative p-5 bg-white rounded-lg">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">데이터 로딩 중...</p>
            </div>
          ) : (
            <Doughnut data={chartData} options={chartOptions} />
          )}
        </div>

        {/* 감정 키워드 요약 정보 */}
        {!loading && (
          <div className="mt-6 xl:mt-0 bg-gray-50 p-6 rounded-lg max-w-full">
            <h3 className="text-lg font-medium mb-4">나의 감정 요약</h3>
            <p className="text-sm text-gray-600 mb-4">
              {periodType} 동안 가장 많이 느낀 감정은 <strong>{getMostFrequentEmotion()}</strong>
              입니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-3 text-sm">
              {emotionData.map((emotion) => (
                <div key={emotion.label} className="flex items-center p-2 rounded-md transition">
                  <span
                    className="w-4 h-4 mr-2 rounded-full"
                    style={{ backgroundColor: emotion.color }}
                  ></span>
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
