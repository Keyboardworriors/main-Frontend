export interface User {
  nickname: string;
  email: string;
  profile_image: string;
  introduce: string | null;
  favorite_genre: string[];
  is_active: boolean;
}

export interface DiaryContent {
  title: string;
  content: string;
  moods: Mood[];
}

export interface Diary {
  diary_id: number;
  date: string;
  title: string;
  content: string;
  created_at: string;
  moods: Mood[];
  rec_music: Music;
}

export interface Music {
  video_id: string;
  title: string;
  artist: string;
  thumbnail: string;
  embedUrl: string;
}

export enum Mood {
  Joy = "기쁨",
  Sadness = "슬픔",
  Anger = "분노",
  Anxiety = "불안",
  Love = "사랑",
  Fear = "두려움",
  Loneliness = "외로움",
  Excitement = "설렘",
  Irritation = "짜증",
  Happiness = "행복",
  Regret = "후회",
  Confidence = "자신감",
  Frustration = "좌절",
  Terror = "공포",
  Thrill = "흥분",
  Depression = "우울",
  Hope = "희망",
  Jealousy = "질투",
  Resentment = "원망",
  Emotion = "감동",
  Hatred = "미움",
  Restlessness = "초조",
  Satisfaction = "만족",
  Disappointment = "실망",
  Nostalgia = "그리움",
  Guilt = "죄책감",
  Shock = "충격",
  Relief = "안도",
  Tension = "긴장",
  Gratitude = "감사",
}
