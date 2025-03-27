import { axiosFetcher } from "./axiosFetcher";
import { MoodData, PeriodType } from "../models/chart";
import { MOOD_COLORS } from "../models/constants";

const mapPeriodToEnglish = (period: PeriodType): string => {
  switch (period) {
    case PeriodType.WEEKLY:
      return "week";
    case PeriodType.MONTHLY:
      return "month";
    case PeriodType.YEARLY:
      return "year";
    default:
      return "week";
  }
};

export const fetchEmotionsByPeriod = async (periodType: PeriodType): Promise<MoodData[]> => {
  try {
    const period = mapPeriodToEnglish(periodType);

    const response = await axiosFetcher.get(`/api/diary/by-period?period=${period}`);

    console.log("API 응답:", response);

    if (!response || !response.emotion_stats) {
      throw new Error(`${period} 데이터를 찾을 수 없습니다`);
    }

    const moodEntries = Object.entries(response.emotion_stats).map(([label, value]) => ({
      label,
      value: Number(value),
      color: MOOD_COLORS[label] || "#AAAAAA",
    }));

    if (moodEntries.length === 0) {
      throw new Error(`${period} 기간에 감정 데이터가 없습니다.`);
    }

    return moodEntries;
  } catch (error) {
    console.error("감정 데이터 조회 실패:", error);
    throw error;
  }
};
