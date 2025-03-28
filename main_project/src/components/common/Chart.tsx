import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PeriodType, MoodData, ChartComponentProps } from "../../models/chart";
import { useModalStore } from "../../store/modal";
import { MOOD_COLORS } from "../../models/constants";
import { fetchEmotionsByPeriod } from "../../api/chartApi";
import { Mood } from "../../models/diary";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  // API 호출 실패 시 더미데이터로 대체
  const generateDummyData = (type: PeriodType) => {
    if (type === PeriodType.WEEKLY) {
      return [
        { label: Mood.Happiness, value: 12, color: MOOD_COLORS[Mood.Happiness] },
        { label: Mood.Sadness, value: 5, color: MOOD_COLORS[Mood.Sadness] },
        { label: Mood.Anxiety, value: 8, color: MOOD_COLORS[Mood.Anxiety] },
        { label: Mood.Anger, value: 3, color: MOOD_COLORS[Mood.Anger] },
        { label: Mood.Hope, value: 7, color: MOOD_COLORS[Mood.Hope] },
      ];
    } else if (type === PeriodType.MONTHLY) {
      return [
        { label: Mood.Happiness, value: 45, color: MOOD_COLORS[Mood.Happiness] },
        { label: Mood.Sadness, value: 23, color: MOOD_COLORS[Mood.Sadness] },
        { label: Mood.Anxiety, value: 30, color: MOOD_COLORS[Mood.Anxiety] },
        { label: Mood.Anger, value: 15, color: MOOD_COLORS[Mood.Anger] },
        { label: Mood.Hope, value: 38, color: MOOD_COLORS[Mood.Hope] },
        { label: Mood.Restlessness, value: 20, color: MOOD_COLORS[Mood.Restlessness] },
      ];
    } else {
      return [
        { label: Mood.Happiness, value: 210, color: MOOD_COLORS[Mood.Happiness] },
        { label: Mood.Sadness, value: 145, color: MOOD_COLORS[Mood.Sadness] },
        { label: Mood.Anxiety, value: 175, color: MOOD_COLORS[Mood.Anxiety] },
        { label: Mood.Anger, value: 80, color: MOOD_COLORS[Mood.Anger] },
        { label: Mood.Hope, value: 100, color: MOOD_COLORS[Mood.Hope] },
        { label: Mood.Restlessness, value: 120, color: MOOD_COLORS[Mood.Restlessness] },
        { label: Mood.Excitement, value: 95, color: MOOD_COLORS[Mood.Excitement] },
        { label: Mood.Regret, value: 65, color: MOOD_COLORS[Mood.Regret] },
      ];
    }
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
    if (loading) return null;

    return (
      <div className="mt-6 xl:mt-0 bg-gray-50 p-6 rounded-lg max-w-full">
        <h3 className="text-lg font-medium mb-4">나의 감정 요약</h3>
        <p className="text-sm text-gray-600 mb-3">
          {periodType} 동안 가장 많이 느낀 감정은 <strong>{getMostFrequentMood()}</strong>
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
      try {
        setLoading(true);

        openModal("loading", {
          message: "차트를 분석중이에요",
          modalPurpose: "chart",
        });

        const data = await fetchEmotionsByPeriod(periodType);
        setMoodData(data);

        setLoading(false);
        closeModal();
      } catch (error) {
        console.error("감정 데이터 조회 실패:", error);

        // API 호출 실패 시 더미데이터로 대체
        const fallbackData = generateDummyData(periodType);
        setMoodData(fallbackData);

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
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">{periodType}</span>
      </h2>
      <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-8 mb-6">
        {renderChart()}
        {renderMoodSummary()}
      </div>
    </div>
  );
};

export default ChartComponent;
