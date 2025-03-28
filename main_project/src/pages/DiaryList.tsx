import { SearchResult } from "../models/search";
import { formatDateKorean } from "../utils/date";

interface DiaryListProps {
  diaries: SearchResult[];
  onDiarySelect: (diaryId: string, date: string) => void;
}

const DiaryList = ({ diaries, onDiarySelect }: DiaryListProps) => {
  if (diaries.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">검색 결과와 일치하는 일기가 없어요.</div>
    );
  }

  return (
    <div className="w-full h-[342px] overflow-y-auto">
      <div className="grid gap-2 px-2">
        {diaries.map((diary) => (
          <div
            key={diary.diary_id}
            onClick={() => onDiarySelect(diary.diary_id.toString(), diary.date)}
            className="cursor-pointer bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-800">{diary.diary_title}</h3>
              <span className="text-xs text-gray-500">
                {formatDateKorean(new Date(diary.date))}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-gray-500">감정: {diary.moods.join(", ")}</span>
              {diary.rec_music && (
                <span className="text-xs text-gray-500">음악: {diary.rec_music.title}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
