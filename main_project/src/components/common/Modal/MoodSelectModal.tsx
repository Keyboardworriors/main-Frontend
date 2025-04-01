import BaseModal from "./BaseModal";
import { useState } from "react";
import { Mood } from "../../../models/diary";

interface MoodSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mood: Mood) => void;
  moods: Mood[];
  isAnalysisFailed?: boolean;
  analyzedKeywords?: string[];
  analyzedMood?: string[];
  isDirectSelect?: boolean;
  onSave: () => void;
}

const MoodSelectModal = ({
  isOpen,
  onClose,
  onSelect,
  moods,
  isAnalysisFailed = false,
  analyzedKeywords,
  isDirectSelect = false,
  onSave,
}: MoodSelectModalProps) => {
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState<boolean>(false);

  const handleMoodSelect = (mood: Mood) => {
    if (selectedMoods.includes(mood)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter((m) => m !== mood));
        onSelect(mood);
      }
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, mood]);
      onSelect(mood);
    }
  };

  const handleSave = () => {
    if (selectedMoods.length === 0) {
      alert("최소 1개의 감정을 선택해주세요.");
      return;
    }
    onSave();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-2 sm:p-4 w-full max-w-4xl mx-auto overflow-x-hidden max-h-[80vh] overflow-y-auto">
        {!isDirectSelect && (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base sm:text-lg text-gray-600 font-semibold">추천 감정 키워드</h2>
            {!isAnalysisFailed && (
              <span className="text-xs sm:text-sm text-gray-500">
                {selectedMoods.length}/3 개의 감정을 선택했어요.
              </span>
            )}
          </div>
        )}

        {!isAnalysisFailed && analyzedKeywords?.length && analyzedKeywords.length > 0 ? (
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 mb-3">
              {analyzedKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleMoodSelect(keyword as Mood)}
                  className={`min-w-[60px] px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 border rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center break-words max-w-full
                    text-xs sm:text-sm font-medium ${
                      selectedMoods.includes(keyword as Mood)
                        ? "bg-[#4A7196] text-white border-[#4A7196] shadow-md hover:bg-[#3A5A7A] hover:border-[#3A5A7A]"
                        : "bg-white text-[#5E8FBF] border-[#A6CCF2] hover:bg-[#F5F9FF] hover:text-[#4A7196] hover:border-[#5E8FBF]"
                    }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ) : isAnalysisFailed ? (
          <div className="text-sm text-red-600 text-center p-3 bg-red-50 rounded-xl border border-red-200 mb-4 sm:mb-6">
            감정기록의 내용이 짧거나 반복적인 경우 감정 분석이 어려워요. 감정을 직접 선택해주세요!
          </div>
        ) : null}

        {(isAnalysisFailed || isDirectSelect) && (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base sm:text-lg text-gray-600 font-semibold">감정 키워드</h2>
            <span className="text-xs sm:text-sm text-gray-500">
              {selectedMoods.length}/3 개의 감정을 선택했어요.
            </span>
          </div>
        )}
        {(isAnalysisFailed || isDirectSelect) && (
          <div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 mb-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className={`min-w-[80px] px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 border rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center break-words max-w-full
                            text-xs sm:text-sm font-medium ${
                              selectedMoods.includes(mood)
                                ? "bg-[#4A7196] text-white border-[#4A7196] shadow-md hover:bg-[#3A5A7A] hover:border-[#3A5A7A]"
                                : "bg-white text-[#5E8FBF] border-[#A6CCF2] hover:bg-[#F5F9FF] hover:text-[#4A7196] hover:border-[#5E8FBF]"
                            }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end relative">
          {selectedMoods.length > 0 && isHoveringSaveBtn && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg w-63 text-xs md:text-sm text-left z-50">
              <div className="absolute bottom-[-6px] right-8 transform rotate-45 w-3 h-3 bg-gray-700"></div>
              선택한 감정 키워드는 변경할 수 없어요! <br />
              신중히 선택해주세요
            </div>
          )}
          <button
            onClick={handleSave}
            onMouseEnter={() => setIsHoveringSaveBtn(true)}
            onMouseLeave={() => setIsHoveringSaveBtn(false)}
            className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 bg-[#4A7196] text-white rounded-full hover:bg-[#3A5A7A] 
                      transition-colors text-xs sm:text-sm font-medium"
          >
            저장하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
export default MoodSelectModal;
