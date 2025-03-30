import { useEffect } from "react";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { formatDateKorean } from "../utils/date";
import diaryApi from "../api/diaryApi";

interface DiaryMusicProps {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  onBack: () => void;
  onComplete: (selectedMusic: Music) => void;
}

const DiaryMusic = ({ selectedDate, diaryContent, onBack, onComplete }: DiaryMusicProps) => {
  const { openModal, closeModal } = useModalStore();
  const formattedDate = formatDateKorean(selectedDate);

  const analyzeMusic = async () => {
    openModal("loading", {
      message: "추천 필로디 🎵",
      modalPurpose: "melody",
    });

    try {
      const recommendedSongs = await diaryApi.recommendMusic(diaryContent.moods, []);
      closeModal();

      if (recommendedSongs.length === 0) {
        openModal("songAnalysisError", {
          message: "추천된 음악이 없어요 😢",
          onRetry: analyzeMusic,
          onSaveWithoutMusic: () => {
            closeModal();
            onComplete({
              video_id: "",
              title: "",
              artist: "",
              thumbnail: "",
              embedUrl: "",
            });
          },
        });
      } else {
        openModal("songSelect", {
          songs: recommendedSongs,
          onConfirm: (selected: Music) => {
            closeModal();
            onComplete(selected);
          },
          onRetry: () => {
            closeModal();
            setTimeout(analyzeMusic, 300);
          },
        });
      }
    } catch (error) {
      closeModal();

      openModal("songAnalysisError", {
        message: "음악 추천에 실패했어요 😭",
        onRetry: analyzeMusic,
        onSaveWithoutMusic: () => {
          closeModal();
          onComplete({
            video_id: "",
            title: "",
            artist: "",
            thumbnail: "",
            embedUrl: "",
          });
        },
      });
    }
  };

  useEffect(() => {
    analyzeMusic();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="이전으로"
        >
          ←
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
                  className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium text-center"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryMusic;
