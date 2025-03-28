import { useEffect } from "react";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { formatDateKorean } from "../utils/date";
import { useModalStore } from "../store/modal";

interface DiaryCompleteProps {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  selectedMusic: Music | null;
  onFinish: () => void;
  onBack: () => void;
}

const DiaryComplete = ({
  selectedDate,
  diaryContent,
  selectedMusic,
  onFinish,
  onBack,
}: DiaryCompleteProps) => {
  const { openModal, closeModal } = useModalStore();
  const formattedDate = formatDateKorean(selectedDate);

  useEffect(() => {
    console.log("DiaryComplete mounted. Selected music:", selectedMusic);
  }, [selectedMusic]);

  const handleDelete = () => {
    openModal("customConfirm", {
      title: "기록을 삭제할까요?",
      message: "삭제하고 나면 되돌릴 수 없어요!",
      confirmText: "삭제하기",
      cancelText: "취소하기",
      isDanger: true,
      onConfirm: onBack,
    });
  };

  const handleSave = async () => {
    const payload = {
      diary_title: diaryContent.title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      rec_music: selectedMusic ? [selectedMusic] : [],
    };

    // 실제 저장 API 호출 (주석처리)
    // try {
    //   const response = await axios.post("/api/diary/create", payload);
    //   console.log("저장 성공:", response.data);
    // } catch (error) {
    //   console.error("저장 실패:", error);
    // }

    onFinish();
  };

  useEffect(() => {
    const handleRetry = () => {
      openModal("loading", {
        message: "추천 필로디 🎵",
        modalPurpose: "melody",
      });

      setTimeout(() => {
        closeModal();

        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
          openModal("songSelect", {
            songs: [
              {
                video_id: "4Tr0otuiQuU",
                title: "Moonlight Sonata",
                artist: "Beethoven",
                thumbnail: "https://i.ytimg.com/vi/4Tr0otuiQuU/hqdefault.jpg",
                embedUrl: "https://www.youtube.com/embed/4Tr0otuiQuU",
              },
              {
                video_id: "9E6b3swbnWg",
                title: "Clair de Lune",
                artist: "Debussy",
                thumbnail: "https://i.ytimg.com/vi/9E6b3swbnWg/hqdefault.jpg",
                embedUrl: "https://www.youtube.com/embed/9E6b3swbnWg",
              },
            ],
            onConfirm: (selected: Music) => {
              closeModal();
              onFinish();
            },
          });
        } else {
          openModal("songAnalysisError", {
            message: "음악 추천에 실패했어요. 다시 분석하시겠습니까?",
            onRetry: () => {
              closeModal();
              setTimeout(handleRetry, 300);
            },
            onSaveWithoutMusic: () => {
              closeModal();
              onFinish();
            },
          });
        }
      }, 1500);
    };

    window.handleRetryFromComplete = handleRetry;
  }, [openModal, closeModal, onFinish]);

  return (
    <div className="w-full max-w-md mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={handleDelete}
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

      {selectedMusic && selectedMusic.video_id ? (
        <div className="mt-6 mb-6">
          <h3 className="text-base text-gray-600 font-semibold mb-3">선택된 노래</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium text-center">
              {selectedMusic.artist} - {selectedMusic.title}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center mb-6 py-4">
          <p className="text-sm text-gray-600">음악 없이 저장되었습니다</p>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-[#4A7196] font-semibold">{formattedDate}</div>
        <div className="flex gap-2">
          {diaryContent.moods.map((mood, index) => (
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
        <p className="text-base font-semibold mt-1 mb-1">{diaryContent.title}</p>
        <p className="text-sm text-gray-700">{diaryContent.content}</p>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#4A7196] text-white rounded-full text-sm font-medium"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default DiaryComplete;
