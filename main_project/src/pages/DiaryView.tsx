import { mockDiaries } from "../mock/diaryData";
import DiaryList from "./DiaryList";
import { formatDate, formatDateKorean, getTargetDateOrToday } from "../utils/date";
import { SearchResult } from "../models/search";

interface DiaryViewProps {
  selectedDate: Date | null;
  isSearchMode?: boolean;
  searchResults: SearchResult[];
  onWriteClick: () => void;
}

const DiaryView = ({
  selectedDate,
  isSearchMode = false,
  searchResults = [],
  onWriteClick,
}: DiaryViewProps) => {
  const targetDiary = mockDiaries.find(
    (diary) => diary.date === formatDate(getTargetDateOrToday(selectedDate)),
  );

  const renderDiaryContent = () => {
    if (!targetDiary) return null;

    return (
      <div className="w-full max-w-md">
        {targetDiary.rec_music.thumbnail && (
          <img
            src={targetDiary.rec_music.thumbnail}
            alt="추천 음악"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2 border border-gray-200"
          />
        )}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">{targetDiary.rec_music.title}</p>
          <p className="text-xs text-gray-600">{targetDiary.rec_music.artist}</p>
        </div>

        <div className="flex justify-between items-start mb-4 mt-8 ">
          <div className="text-sm text-[#4A7196] font-semibold">
            {formatDateKorean(getTargetDateOrToday(selectedDate))}
          </div>
          <div className="flex gap-2">
            {targetDiary.moods.map((mood, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#4A7196] text-white rounded-full text-xs font-medium shadow-sm"
              >
                {mood}
              </span>
            ))}
          </div>
        </div>

        <p className="text-base font-semibold mt-3 mb-1">{targetDiary.title}</p>
        <p className="text-sm text-gray-700">{targetDiary.content}</p>
      </div>
    );
  };

  const renderWriteButton = () => (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={onWriteClick}
        className="border border-black py-1 px-2 text-xs rounded-full active:scale-95 transition-transform duration-150 cursor-pointer"
      >
        + 감정 기록 작성하기
      </button>
    </div>
  );

  return (
    <div className="p-2 md:p-4 bg-transparent w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center overflow-auto">
        {isSearchMode ? (
          <DiaryList diaries={searchResults} />
        ) : targetDiary ? (
          renderDiaryContent()
        ) : (
          renderWriteButton()
        )}
      </div>
    </div>
  );
};

export default DiaryView;
