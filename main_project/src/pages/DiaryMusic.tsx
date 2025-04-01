import { useEffect, useCallback } from "react";
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

  const handleNoMusic = useCallback(() => {
    closeModal();
    onComplete({
      video_id: "",
      title: "",
      artist: "",
      thumbnail: "",
      embedUrl: "",
    });
  }, [closeModal, onComplete]);

  const analyzeMusic = useCallback(async () => {
    openModal("loading", {
      message: "추천 필로디 🎵",
      modalPurpose: "melody",
    });

    try {
      const recommendedSongs = await diaryApi.recommendMusic(diaryContent.moods, []);
      const validSongs = recommendedSongs.filter(
        (s: Music & { error?: boolean }) => s.video_id && s.title && !s.error,
      );

      console.log("서버 추천 응답:", recommendedSongs);
      console.log("유효한 곡 수:", validSongs.length);

      closeModal();

      if (validSongs.length === 0) {
        openModal("customConfirm", {
          title: "⚠️ 404 (NOT FOUND)",
          message:
            "음악 추천에 실패했어요\n다시 분석을 원하시면 다시 시도,\n그렇지 않다면 저장하기를 눌러주세요!",
          confirmText: "다시시도",
          cancelText: "저장하기",
          isDanger: false,
          onConfirm: () => analyzeMusic(),
          onCancel: handleNoMusic,
        });
      } else {
        openModal("songSelect", {
          songs: validSongs,
          onConfirm: (selected?: Music) => {
            if (!selected) return;
            closeModal();
            onComplete({
              ...selected,
              title: selected.title.replace(/^\*/, ""),
            });
          },
          onRetry: () => {
            closeModal();
            setTimeout(analyzeMusic, 300);
          },
        });
      }
    } catch (error) {
      console.error("DM 음악 추천 에러:", error);
      closeModal();
      openModal("customConfirm", {
        title: "⚠️ 404 (NOT FOUND)",
        message:
          "음악 추천에 실패했어요\n다시 분석을 원하시면 다시 시도,\n그렇지 않다면 저장하기를 눌러주세요!",
        confirmText: "다시시도",
        cancelText: "저장하기",
        isDanger: false,
        onConfirm: () => analyzeMusic(),
        onCancel: handleNoMusic,
      });
    }
  }, [diaryContent.moods, closeModal, onComplete, openModal, handleNoMusic]);

  // analyzeMusic 포함
  useEffect(() => {
    analyzeMusic();
  }, [analyzeMusic]);

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
