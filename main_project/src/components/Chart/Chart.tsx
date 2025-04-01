import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PeriodType, MoodData, ChartComponentProps } from "../../models/chart";
import { useModalStore } from "../../store/modal";
import { MOOD_COLORS } from "../../models/constants";
import { fetchEmotionsByPeriod } from "../../api/chartApi";
import { Mood } from "../../models/diary";

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ 새로 추가된: 한글 라벨 매핑
const PERIOD_LABELS: Record<PeriodType, string> = {
  WEEKLY: "주간",
  MONTHLY: "월간",
  YEARLY: "연간",
};

const ChartComponent = ({ periodType }: ChartComponentProps) => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { openModal, closeModal } = useModalStore();

  const createChartData = () => ({
    labels: moodData.map((item) => item.label),
    datasets: [
      {
        data: moodData.map((item) => item.value),
        backgroundColor: moodData.map((item) => item.color),
      },
    ],
  });

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
          label: (context: TooltipItem<"doughnut">) => `${context.label}: ${context.raw}회`,
        },
      },
    },
  };

  const getMostFrequentMood = () => {
    if (moodData.length === 0) return "";
    const sortedData = [...moodData].sort((a, b) => b.value - a.value);
    return sortedData[0].label;
  };

  const renderMoodItem = (mood: MoodData) => (
    <div key={mood.label} className="flex items-center py-1 px-2 rounded-md transition">
      <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: mood.color }}></span>
      <span className="text-gray-700">
        {mood.label}: {mood.value}회
      </span>
    </div>
  );

  const renderChart = () => (
    <div className="w-full xl:col-span-2 h-72 md:h-80 relative p-5 bg-white rounded-lg">
      {!loading && <Doughnut data={createChartData()} options={chartOptions} />}
    </div>
  );

  const renderMoodSummary = () => {
    if (loading || moodData.length === 0) return null;

    return (
      <div className="mt-6 xl:mt-0 bg-gray-50 p-6 rounded-lg max-w-full">
        <h3 className="text-lg font-medium mb-4">나의 감정 요약</h3>
        <p className="text-sm text-gray-600 mb-3">
          {PERIOD_LABELS[periodType]} 동안 가장 많이 느낀 감정은 <strong>{getMostFrequentMood()}</strong>
          입니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-y-1 gap-x-2 text-sm">
          {moodData.map(renderMoodItem)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loadChartData = async () => {
      if (!periodType) return;

      try {
        setLoading(true);
        openModal("loading", {
          message: "차트를 분석중이에요",
          modalPurpose: "chart",
        });

        const data = await fetchEmotionsByPeriod(periodType);

        if (!data || Object.keys(data).length === 0) {
          setMoodData([]);
        } else {
          const formatted: MoodData[] = Object.entries(data).map(([label, value]) => ({
            label,
            value: Number(value),
            color: MOOD_COLORS[label] || "#AAAAAA",
          }));
          setMoodData(formatted);
        }

        setLoading(false);
        closeModal();
      } catch (error) {
        console.error("감정 데이터 조회 실패:", error);
        setMoodData([]);
        setLoading(false);
        closeModal();
      }
    };

    loadChartData();
  }, [periodType, openModal, closeModal]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        나의 감정 발자취{" "}
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">
          {PERIOD_LABELS[periodType]}
        </span>
      </h2>

      {loading ? null : moodData.length === 0 ? (
        <div className="flex items-center justify-center h-80 bg-white rounded-lg text-center text-gray-500 text-base font-medium">
          감정 차트는 일기를 기록 하신 후에 확인가능합니다😊
        </div>
      ) : (
        <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-8 mb-6">
          {renderChart()}
          {renderMoodSummary()}
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
