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
      <div className="p-4 sm:p-6 w-[95vw] sm:w-[90vw] md:w-full max-w-6xl">
        {/* 추천 감정 키워드 */}
        {!isAnalysisFailed && analyzedKeywords?.length ? (
          <div className="mb-4 sm:mb-6">
            <h2 className="mb-2 sm:mb-3 text-base sm:text-lg text-gray-600 font-semibold">
              추천 감정 키워드
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 mb-3">
              {analyzedKeywords.map((keyword, index) => (
                <button
                  key={index}
                  className="p-2 sm:p-2.5 bg-[#F5F9FF] text-[#5E8FBF] border border-[#A6CCF2] rounded-md hover:bg-[#E1EFFB] text-sm"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ) : isAnalysisFailed ? (
          <div className="text-sm text-red-600 text-center p-3 bg-red-50 rounded-xl border border-red-200">
            감정 분석에 실패했어요. 직접 감정 키워드를 선택해주세요!
          </div>
        ) : null}

        {/* 기본 감정 키워드 */}
        {!isAnalysisFailed && (
          <div className="min-h-[200px] sm:h-[240px]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg text-gray-600 font-semibold">감정 키워드</h2>
              <span className="text-xs sm:text-sm text-gray-500">
                {selectedMoods.length}/3 개의 감정을 선택했어요.
              </span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 sm:gap-2.5 md:gap-3 mb-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className={`p-2 sm:p-2 md:p-2.5 border rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer
                            text-xs sm:text-sm font-medium min-w-[50px] sm:min-w-[60px] md:min-w-[80px] ${
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

        {/* Save Button */}
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
