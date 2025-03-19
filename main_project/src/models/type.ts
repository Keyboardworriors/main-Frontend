import { ReactNode } from "react";

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
  diaryListContent: ReactNode;
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

//mood 추가해야함
export enum Mood {
  HAPPY = "happy",
  SAD = "sad",
  ANGRY = "angry",
  NEUTRAL = "neutral",
  EXCITED = "excited",
  STRESSED = "stressed",
}
