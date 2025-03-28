import { Diary, DiaryContent } from "../models/diary";
import { axiosFetcher } from "./axiosFetcher";

const diaryApi = {
  // 일기 목록 조회
  getDiaries: async () => {
    return await axiosFetcher.get<{ data: Diary[] }>("api/diary/");
  },

  // 단일 일기 조회
  getDiary: async (diary_id: string) => {
    return await axiosFetcher.get<{ data: Diary }>(`api/diary/${diary_id}/`);
  },

  // 일기 생성(저장)
  createDiary: async (data: DiaryContent) => {
    return await axiosFetcher.post<{ data: Diary }>("api/diary/create/", data);
  },

  // 감정 분석
  analyzeDiaryMood: async (title: string, content: string) => {
    const response = await axiosFetcher.post<{ moods: string[] }>(
      "api/diary/recommendation-keyword/",
      {
        title,
        content,
      },
    );
    console.log("추천받은 감정 키워드:", response.moods);
    return response.moods; // 변경된 부분: response를 moods로 반환
  },

  // 일기 검색
  searchDiaries: async (query: string) => {
    return await axiosFetcher.post<{ data: Diary[] }>("api/diary/search/", { q: query });
  },

  // 일기 삭제
  deleteDiary: async (diary_id: string) => {
    return await axiosFetcher.delete(`api/diary/${diary_id}/`);
  },
};

export default diaryApi;
