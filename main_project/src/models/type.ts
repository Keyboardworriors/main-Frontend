import { ReactNode } from "react";

/* 인터페이스 */
export interface User {
  id: string;
  nickname: string;
  email: string;
  profile_image: string; //url
  introduce: string;
  favorite_genre: string;
}

export interface Music {
  VideoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  embedUrl: string;
}

export interface Diary {
  diary_id: number;
  date: string;
  title: string;
  content: string;
  created_At: string;
  mood: Mood;
  rec_music: Music;
}

export interface Search {
  search: string;
}

export interface Chart {
  mood: Mood;
  count: number;
}

// 다이어리 홈 레이아웃
export interface HomeLayoutProps {
  children: ReactNode;
}

// 다이어리 섹션 레이아웃
export type DiaryLayoutProps = {
  calendarContent: ReactNode;
  resultContent: ReactNode;
};

//소개페이지 레이아웃
export type IntroLayoutProps = {
  children: React.ReactNode;
};

export type FeatureSectionProps = {
  title: string;
  description: string;
  imageOnLeft?: boolean;
};

export type Reason = {
  title: string;
  description: string;
};

//회원정보입력 관련 타입
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
