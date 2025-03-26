import { PeriodType } from "./chart";
import { Mood } from "./diary";

// 차트 탭
export const PERIOD_TYPES = [PeriodType.WEEKLY, PeriodType.MONTHLY, PeriodType.YEARLY];

// 차트 감정별 색상 매핑
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

// 다이어리의 음악 선택 모달 스타일
export const SongModalStyles = {
  // 카드 스타일
  CARD_BASE:
    "box-border cursor-pointer flex flex-col rounded-lg transition-all duration-300 ease-in-out shadow-sm relative",
  CARD_SIZE:
    "w-[calc(100%-16px)] h-[170px] mb-2 mx-1 p-1.5 sm:w-[calc(50%-16px)] sm:h-[180px] md:w-[calc(33.33%-16px)] md:h-[210px] md:mb-3 md:mx-2 md:p-2 lg:h-[230px]",
  THUMBNAIL_HEIGHT: "h-[90px] sm:h-[100px] md:h-[130px] lg:h-[150px]",
  PLAY_BUTTON:
    "bg-red-600 rounded-full flex items-center justify-center transition-opacity hover:opacity-90 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10",

  // 버튼 스타일
  BUTTON_BASE:
    "rounded-full font-medium transition-colors shadow-sm px-3 py-1.5 text-sm min-w-[70px] sm:min-w-[80px] md:px-4 md:py-2.5 md:text-lg md:min-w-[120px]",
  BUTTON_CANCEL: "border border-gray-700 bg-white text-gray-700 hover:bg-gray-50",
  BUTTON_SAVE_ACTIVE: "bg-[#7698CC] text-white hover:bg-[#6387BB]",
  BUTTON_SAVE_INACTIVE: "bg-gray-300 text-gray-500 cursor-not-allowed",
};
