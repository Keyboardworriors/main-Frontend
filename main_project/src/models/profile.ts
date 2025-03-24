export type Genre =
  | "Electronic"
  | "Pop"
  | "Ballad"
  | "K-pop"
  | "Jazz"
  | "Rock"
  | "Classic"
  | "Hip-hop"
  | "Country";

export interface GenreSelectorProps {
  selectedGenres: Genre[];
  onGenreClick: (genre: Genre) => void;
}
// 차트 임시
export interface EmotionData {
  label: string;
  value: number;
  color: string;
}

// 차트 컴포넌트 props
export interface ChartComponentProps {
  periodType: PeriodType;
}

// 차트 레이아웃 props
export interface ChartLayoutProps {
  chartContent: React.ReactNode;
  onTabChange?: (tab: PeriodType) => void;
}

/* enum */
// 차트페이지 기간 타입
export enum PeriodType {
  WEEKLY = "주간",
  MONTHLY = "월간",
  YEARLY = "연간",
}

export interface ProfileImageUploaderProps {
  profileImage: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}
//mood 추가해야함
export enum Mood {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANGRY = "ANGRY",
  NEUTRAL = "NEUTRAL",
  EXCITED = "EXCITED",
  STRESSED = "STRESSED",
}
