import BaseModal from "./BaseModal";
import { useState } from "react";

interface MoodSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mood: string) => void;
  moods: string[];
  isAnalysisFailed?: boolean;
  analyzedMood?: string;
  isDirectSelect?: boolean;
  onSave: () => void;
}

const MoodSelectModal = ({
  isOpen,
  onClose,
  onSelect,
  moods,
  isAnalysisFailed = false,
  analyzedMood,
  isDirectSelect = false,
  onSave,
}: MoodSelectModalProps) => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const handleMoodSelect = (mood: string) => {
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
        {!isDirectSelect && (
          <div className="mb-4 sm:mb-6">
            <h2 className="mb-2 sm:mb-3 text-base sm:text-lg text-gray-600 font-semibold">
              추천 감정 키워드
            </h2>
            {!isAnalysisFailed && analyzedMood ? (
              <div className="text-base sm:text-lg text-[#5E8FBF] p-3 bg-[#F5F9FF] rounded-xl border border-[#A6CCF2]">
                {analyzedMood}
              </div>
            ) : (
              <div className="text-sm text-red-600 text-center p-3 bg-red-50 rounded-xl border border-red-200">
                감정 분석에 실패했어요. 직접 감정 키워드를 선택해주세요!
              </div>
            )}
          </div>
        )}

        <div className="min-h-[200px] sm:h-[240px]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base sm:text-lg text-gray-600 font-semibold">감정 키워드 선택</h2>
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

        <div className="flex justify-end">
          <button
            onClick={handleSave}
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
