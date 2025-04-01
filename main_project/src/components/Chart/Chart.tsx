import { useEffect, useState, useCallback } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MoodData, ChartComponentProps } from "../../models/chart";
import { useModalStore } from "../../store/modal";
import { MOOD_COLORS } from "../../models/constants";
import chartApi from "../../api/chartApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ periodType }: ChartComponentProps) => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { openModal, closeModal } = useModalStore();

  const transformToMoodData = (stats: { [label: string]: number }): MoodData[] => {
    return Object.entries(stats).map(([label, value]) => ({
      label,
      value: Number(value),
      color: MOOD_COLORS[label] || "#AAAAAA",
    }));
  };

  const createChartData = () => ({
    labels: moodData.map((item) => item.label),
    datasets: [
      {
        data: moodData.map((item) => item.value),
        backgroundColor: moodData.map((item) => item.color),
      },
    ],
  });

  const getMostFrequentMood = () => {
    if (moodData.length === 0) return "";
    return [...moodData].sort((a, b) => b.value - a.value)[0].label;
  };

  const renderMoodItem = (mood: MoodData) => (
    <div key={mood.label} className="flex items-center py-1 px-2">
      <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: mood.color }} />
      <span className="text-gray-700">
        {mood.label}: {mood.value}회
      </span>
    </div>
  );

  const loadChartData = useCallback(async () => {
    setLoading(true);
    setError(false);

    openModal("loading", {
      message: "차트를 분석중이에요",
      modalPurpose: "chart",
    });

    try {
      const stats = await chartApi.fetchEmotionsByPeriod(periodType);
      const transformed = transformToMoodData(stats);
      setMoodData(transformed);
    } catch (error) {
      console.error("차트 데이터 에러:", error);
      setError(true);
      setMoodData([]);
    } finally {
      closeModal();
      setLoading(false);
    }
  }, [periodType, openModal, closeModal]);

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">
        나의 감정 발자취{" "}
        <span className="bg-[#A6CCF2] text-white px-2 py-1 rounded-md text-sm">{periodType}</span>
      </h2>

      {!loading && error ? (
        <div className="flex flex-col items-center justify-center h-80 bg-white rounded-lg text-center text-gray-500 text-base font-medium space-y-4">
          <p className="mt[-30px]">일기를 불러오는데 실패했어요🥲<br />다시 시도해주세요!</p>
          <button
            onClick={loadChartData}
            className="mt-2 px-4 py-2 bg-[#7698CC] text-white rounded-full hover:bg-[#6387BB] transition"
          >
            다시 시도
          </button>
        </div>
      ) : !loading && moodData.length === 0 ? (
        <div className="flex items-center justify-center h-80 bg-white rounded-lg text-center text-gray-500 text-base font-medium">
          <p className="mt[-30px]">감정 통계는 일기를 기록 하신 후에<br /> 확인 가능합니다 <br /> 지금 일기를 기록해보세요 😊</p>
        </div>
      ) : (
        <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-8 mb-6">
          <div className="w-full xl:col-span-2 h-72 md:h-80 relative p-5 bg-white rounded-lg">
            {!loading && (
              <Doughnut
                data={createChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        font: { size: 12 },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context: TooltipItem<"doughnut">) =>
                          `${context.label}: ${context.raw}회`,
                      },
                    },
                  },
                }}
              />
            )}
          </div>

          {!loading && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
