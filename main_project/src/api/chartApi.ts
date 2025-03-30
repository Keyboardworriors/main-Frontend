import { PeriodType, RawEmotionStats } from "../models/chart";
import { axiosFetcher } from "./axiosFetcher";

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

const chartApi = {
  fetchEmotionsByPeriod: async (periodType: PeriodType): Promise<RawEmotionStats> => {
    const period = mapPeriodToEnglish(periodType);
    const res = await axiosFetcher.get<{ emotion_stats: RawEmotionStats }>("/api/diary/by-period", {
      period,
    });

    return res.emotion_stats;
  },
};

export default chartApi;
