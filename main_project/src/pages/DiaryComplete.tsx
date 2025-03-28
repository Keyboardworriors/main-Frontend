import { useEffect, useState } from "react";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { formatDateKorean } from "../utils/date";
import { useModalStore } from "../store/modal";

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
  const { openModal } = useModalStore();
  const formattedDate = formatDateKorean(selectedDate);

  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState(false); // ✅ 말풍선 상태

  // ✅ 선택된 음악 확인 로그
  useEffect(() => {
    if (selectedMusic) {
      console.log("DiaryComplete rendered with music:", selectedMusic);
    } else {
      console.log("DiaryComplete rendered: selectedMusic is null or undefined");
    }
  }, [selectedMusic]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[60%]">
          <h2 className="text-base font-medium text-gray-800 mb-4 block border-b border-[#4A7196] px-1">
            {diaryContent.title}
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

            {selectedMusic?.video_id && (
              <>
                <h3 className="text-base text-gray-600 font-semibold mb-3">추천된 필로디 🎵</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium min-w-[80px] text-center">
                    {selectedMusic.title} - {selectedMusic.artist}
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
              onClick={onFinish} // 바로 저장
              onMouseEnter={() => setIsHoveringSaveBtn(true)}
              onMouseLeave={() => setIsHoveringSaveBtn(false)}
              className="px-4 py-2 bg-[#4A7196] text-white rounded-full hover:bg-[#3A5A7A] transition-colors text-sm font-medium flex items-center gap-2"
            >
              완료하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryComplete;
