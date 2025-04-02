import { useQuery } from "@tanstack/react-query";
import diaryApi from "../../api/diaryApi";

export const useDiariesQuery = () => {
  return useQuery({
    queryKey: ["diaryDates"],
    queryFn: async () => {
      const res = await diaryApi.getDiaries();
      return res.data;
    },
  });
};

export const useDiaryQuery = (diaryId: string | null) => {
  return useQuery({
    queryKey: ["diary", diaryId],
    queryFn: async () => {
      if (!diaryId) throw new Error("diaryId가 필요합니다.");
      const res = await diaryApi.getDiary(diaryId);
      return res.data;
    },
    enabled: !!diaryId,
  });
};
