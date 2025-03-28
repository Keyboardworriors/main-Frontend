import { formatDate, formatDateKorean, getTargetDateOrToday } from "../utils/date";
import { SearchResult } from "../models/search";
import { Diary } from "../models/diary";
import { useModalStore } from "../store/modal";
import { useEffect, useState } from "react";
import DiaryList from "./DiaryList";
import diaryApi from "../api/diaryApi";

interface DiaryViewProps {
  selectedDate: Date | null;
  isSearchMode?: boolean;
  searchResults: SearchResult[];
  onWriteClick: () => void;
  diaryIdMap: Record<string, string>;
  selectedDiaryId: string | null;
  onDiarySelect: (id: string, date: string) => void;
}

const DiaryView = ({
  selectedDate,
  isSearchMode = false,
  searchResults = [],
  onWriteClick,
  diaryIdMap,
  selectedDiaryId,
  onDiarySelect,
}: DiaryViewProps) => {
  const { openModal } = useModalStore();
  const [diary, setDiary] = useState<Diary | null>(null);

  const handleDeleteDiary = async () => {
    if (!selectedDate) return;
    const dateStr = formatDate(getTargetDateOrToday(selectedDate));
    const diaryId = diaryIdMap[dateStr];
    if (!diaryId) return;
    try {
      await diaryApi.deleteDiary(diaryId);
      setDiary(null);
    } catch (error) {
      console.error("일기 삭제 실패", error);
    }
  };

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      const diaryId = selectedDiaryId ?? diaryIdMap[formatDate(getTargetDateOrToday(selectedDate))];
      if (!diaryId) {
        setDiary(null);
        return;
      }
      try {
        const res = await diaryApi.getDiary(diaryId);
        setDiary(res.data);
      } catch (err) {
        console.error("일기 조회 실패", err);
        setDiary(null);
      }
    };
    fetchDiaryDetail();
  }, [selectedDate, diaryIdMap, selectedDiaryId]);

  const renderDiaryContent = () => {
    if (!diary) return null;

    return (
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              // 컨펌 모달 코드 추가
              openModal("customConfirm", {
                title: "기록을 삭제할까요?",
                message: "삭제하고 나면 되돌릴 수 없어요!",
                confirmText: "삭제하기",
                cancelText: "취소하기",
                isDanger: true,
                onConfirm: handleDeleteDiary,
              });
            }}
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="삭제"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {diary.rec_music?.thumbnail && (
          <img
            src={diary.rec_music.thumbnail}
            alt="추천 음악"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2 border border-gray-200"
          />
        )}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">{diary.rec_music?.title}</p>
          <p className="text-xs text-gray-600">{diary.rec_music?.artist}</p>
        </div>

        <div className="flex justify-between items-start mb-4 mt-8">
          <div className="text-sm text-[#4A7196] font-semibold">
            {formatDateKorean(getTargetDateOrToday(selectedDate))}
          </div>
          <div className="flex gap-2">
            {diary.moods?.map((mood: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#4A7196] text-white rounded-full text-xs font-medium shadow-sm"
              >
                {mood}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="text-base font-semibold mt-1 mb-1">{diary.diary_title}</p>
          <p className="text-sm text-gray-700">{diary.content}</p>
        </div>
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
        {isSearchMode && selectedDiaryId === null ? (
          <DiaryList diaries={searchResults} onDiarySelect={onDiarySelect} />
        ) : diary ? (
          <div className="w-full h-full flex items-center justify-center">
            {renderDiaryContent()}
          </div>
        ) : (
          renderWriteButton()
        )}
      </div>
    </div>
  );
};

export default DiaryView;
