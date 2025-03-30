import { formatDateKorean } from "../utils/date";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { useState } from "react";
import diaryApi from "../api/diaryApi";

type DiaryContentPreviewProps = {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  onEdit: () => void;
  onCompleteMusic: (selectedMusic: Music) => void;
};

const DiaryContentPreview = ({
  selectedDate,
  diaryContent,
  onEdit,
  onCompleteMusic,
}: DiaryContentPreviewProps) => {
  const formattedDate = formatDateKorean(selectedDate);
  const { openModal, closeModal } = useModalStore();
  const [buttonText, setButtonText] = useState("필로디");
  const [isSaving, setIsSaving] = useState(false);

  const retryMelodyAnalysis = async () => {
    closeModal();
    setTimeout(() => {
      analyzeMusic();
    }, 300);
  };

  const analyzeMusic = async () => {
    if (!diaryContent.moods || diaryContent.moods.length === 0) {
      console.warn("감정 키워드가 비어있어서 추천을 실행하지 않습니다.");
      return;
    }

    openModal("loading", {
      message: "추천 필로디 🎵",
      modalPurpose: "melody",
    });

    try {
      const favoriteGenre = []; // 유저 장르 필요 시 추가
      const songs = await diaryApi.recommendMusic(diaryContent.moods, favoriteGenre);

      closeModal();

      if (songs && songs.length > 0) {
        openModal("songSelect", {
          songs,
          onConfirm: (selected: Music) => {
            closeModal();
            // 음악 제목 앞 * 제거
            const cleaned = {
              ...selected,
              title: selected.title.replace(/^\*/, ""),
            };
            onCompleteMusic(cleaned);
          },
          onRetry: retryMelodyAnalysis,
        });
      } else {
        openModal("songAnalysisError", {
          onRetry: retryMelodyAnalysis,
          onSaveWithoutMusic: () => {
            closeModal();
            setButtonText("저장하기");
            setIsSaving(true);
          },
        });
      }
    } catch (error) {
      closeModal();
      openModal("songAnalysisError", {
        onRetry: retryMelodyAnalysis,
        onSaveWithoutMusic: () => {
          closeModal();
          setButtonText("저장하기");
          setIsSaving(true);
        },
      });
    }
  };

  const handleMelodyRecommendation = async () => {
    if (isSaving) {
      onCompleteMusic({
        video_id: "",
        title: "",
        artist: "",
        thumbnail: "",
        embedUrl: "",
      });
      return;
    }

    analyzeMusic();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="창닫기"
        >
          ✕
        </button>
      </div>

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
            <div className="flex flex-wrap gap-2">
              {diaryContent.moods.map((mood, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium min-w-[80px] text-center"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 md:mt-8">
            <button
              onClick={handleMelodyRecommendation}
              className="px-4 py-2 bg-[#4A7196] text-white rounded-full hover:bg-[#3A5A7A] transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>{buttonText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryContentPreview;
