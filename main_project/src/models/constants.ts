import { PeriodType } from "./chart";
import { Mood } from "./diary";

// 차트 탭
export const PERIOD_TYPES = [PeriodType.WEEKLY, PeriodType.MONTHLY, PeriodType.YEARLY];

// 감정별 색상 매핑
export const MOOD_COLORS: Record<string, string> = {
  [Mood.Joy]: "#8BC34A",
  [Mood.Happiness]: "#4CAF50",
  [Mood.Sadness]: "#3F51B5",
  [Mood.Anxiety]: "#00BCD4",
  [Mood.Anger]: "#F44336",
  [Mood.Fear]: "#9C27B0",
  [Mood.Love]: "#E91E63",
  [Mood.Hope]: "#FFEB3B",
  [Mood.Loneliness]: "#5D4037",
  [Mood.Excitement]: "#FF9800",
  [Mood.Irritation]: "#FF5722",
  [Mood.Regret]: "#607D8B",
  [Mood.Confidence]: "#009688",
  [Mood.Frustration]: "#795548",
  [Mood.Terror]: "#673AB7",
  [Mood.Thrill]: "#2196F3",
  [Mood.Depression]: "#303F9F",
  [Mood.Jealousy]: "#827717",
  [Mood.Resentment]: "#BF360C",
  [Mood.Emotion]: "#D81B60",
  [Mood.Hatred]: "#B71C1C",
  [Mood.Restlessness]: "#FFC107",
  [Mood.Satisfaction]: "#1976D2",
  [Mood.Disappointment]: "#546E7A",
  [Mood.Nostalgia]: "#8D6E63",
  [Mood.Guilt]: "#455A64",
  [Mood.Shock]: "#7B1FA2",
  [Mood.Relief]: "#43A047",
  [Mood.Tension]: "#EF6C00",
  [Mood.Gratitude]: "#0097A7",
};
