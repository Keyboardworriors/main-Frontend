import { useState } from "react";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { format } from "date-fns";
import diaryApi from "../api/diaryApi";

type DiaryCompleteProps = {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  selectedMusic: Music | null;
  onBack: () => void;
  onFinish: () => void;
};

const DiaryComplete = ({
  selectedDate,
  diaryContent,
  selectedMusic,
  onFinish,
}: DiaryCompleteProps) => {
  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState(false);

  const handleSaveDiary = async () => {
    const payload = {
      diary_title: diaryContent.diary_title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      date: format(selectedDate, "yyyy-MM-dd"),
      rec_music:
        selectedMusic && selectedMusic.title
          ? {
              ...selectedMusic,
              title: selectedMusic.title.replace(/^\**/, "").trim(), 
            }
          : null,
    };

    console.log("일기 저장 요청 데이터: ", payload);

    try {
      await diaryApi.createDiary(payload);
      onFinish(); 
    } catch (error) {
      console.error("일기 저장 실패:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[60%]">
          <h2 className="text-base font-medium text-gray-800 mb-4 block border-b border-[#4A7196] px-1">
            {diaryContent.diary_title}
          </h2>
          <div className="border border-[#4A7196] rounded-lg p-3 h-[280px] bg-white overflow-y-auto">
            <div className="prose prose-sm max-w-none h-full text-sm">
              {diaryContent.content.split("\n").map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col justify-between md:pl-2.5 md:pt-10 mt-4 md:mt-0">
          <div>
            <h3 className="text-base text-gray-600 font-semibold mb-3">감정 키워드</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {diaryContent.moods.map((mood, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium min-w-[80px] text-center"
                >
                  {mood}
                </span>
              ))}
            </div>

            {selectedMusic && selectedMusic.title && (
              <>
                <h3 className="text-base text-gray-600 font-semibold mb-3">추천된 필로디 🎵</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium min-w-[80px] text-center">
                    {selectedMusic.title.replace(/^\*/, "").trim()} - {selectedMusic.artist}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end mt-4 md:mt-8 relative">
            {isHoveringSaveBtn && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg w-60 text-xs text-left z-50">
                <div className="absolute bottom-[-6px] right-6 transform rotate-45 w-3 h-3 bg-gray-700"></div>
                저장하신 기록은 수정할 수 없어요!
              </div>
            )}

            <button
              onClick={handleSaveDiary}
              onMouseEnter={() => setIsHoveringSaveBtn(true)}
              onMouseLeave={() => setIsHoveringSaveBtn(false)}
              className="px-4 py-2 bg-[#4A7196] text-white rounded-full hover:bg-[#3A5A7A] transition-colors text-sm font-medium flex items-center gap-2"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryComplete;
