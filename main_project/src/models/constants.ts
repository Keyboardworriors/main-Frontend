import { PeriodType } from "./chart";
import { Mood } from "./diary";

// 차트 탭
export const PERIOD_TYPES = [PeriodType.WEEKLY, PeriodType.MONTHLY, PeriodType.YEARLY];

// 차트 감정별 색상 매핑
export const MOOD_COLORS: Record<string, string> = {
  [Mood.Joy]: "#A8E6CF",
  [Mood.Happiness]: "#C3F0D8",
  [Mood.Sadness]: "#AECBFA",
  [Mood.Depression]: "#B8C1EC",
  [Mood.Anxiety]: "#D0BBFF",
  [Mood.Fear]: "#C9B6E4",
  [Mood.Terror]: "#E1BEE7",
  [Mood.Anger]: "#FFABAB",
  [Mood.Irritation]: "#FFCBC1",
  [Mood.Hatred]: "#FFB7B2",
  [Mood.Love]: "#FFDFD3",
  [Mood.Excitement]: "#FFD3E0",
  [Mood.Thrill]: "#FFC8DD",
  [Mood.Hope]: "#FFF9C4",
  [Mood.Confidence]: "#FFE77A",
  [Mood.Loneliness]: "#D9E3F0",
  [Mood.Nostalgia]: "#DCE2E8",
  [Mood.Regret]: "#D8D3CD",
  [Mood.Guilt]: "#E5E1DA",
  [Mood.Frustration]: "#BFCCE6",
  [Mood.Disappointment]: "#C1CAD6",
  [Mood.Resentment]: "#A5D8CA",
  [Mood.Jealousy]: "#B6E2D3",
  [Mood.Emotion]: "#FFDAC1",
  [Mood.Satisfaction]: "#FFE5D0",
  [Mood.Restlessness]: "#FFEEAD",
  [Mood.Tension]: "#FFE0AC",
  [Mood.Shock]: "#A0E4E5",
  [Mood.Relief]: "#CDF6F0",
  [Mood.Gratitude]: "#B4F0E0",
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
