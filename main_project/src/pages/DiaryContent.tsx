import { useEffect, useRef, useState } from "react";
import { formatDateKorean } from "../utils/date";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { useDiaryStore } from "../store/diary";
import diaryApi from "../api/diaryApi";
import { Genre } from "../models/profile";
import { AxiosError } from "axios";
import SongSelectModal from "../components/common/Modal/SongSelectModal";

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
  const setIsWriting = useDiaryStore((state) => state.setIsWriting);
  const buttonText = "필로디";
  const favoriteGenre: Genre[] = [];

  const cachedValidSongs = useRef<Music[]>([]);
  const [isSongSelectOpen, setIsSongSelectOpen] = useState(false);

  useEffect(() => {
    setIsWriting(true);
    return () => setIsWriting(false);
  }, [setIsWriting]);

  const retryMelodyAnalysis = () => {
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
      const songs = (await diaryApi.recommendMusic(diaryContent.moods, favoriteGenre)) as (Music & {
        error?: boolean;
      })[];

      const validSongs = songs.filter((song) => song.video_id && song.title && !song.error);

      cachedValidSongs.current = validSongs;
      closeModal();

      if (validSongs.length > 0) {
        setIsSongSelectOpen(true);
      } else {
        openModal("customConfirm", {
          title: "⚠️ 추천 실패",
          message: "음악 추천에 실패했어요\n다시 시도하시거나 음악 없이 저장할 수 있어요!",
          confirmText: "다시 시도",
          cancelText: "저장하기",
          isDanger: false,
          onConfirm: retryMelodyAnalysis,
          onCancel: () => {
            setTimeout(() => {
              setIsSongSelectOpen(true);
            }, 50);
          },
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("🎵 [DiaryContentPreview] 음악 추천 실패:", err);

      closeModal();
      openModal("customConfirm", {
        title: "⚠️ 추천 실패",
        message: "음악 추천에 실패했어요\n다시 시도하시거나 음악 없이 저장할 수 있어요!",
        confirmText: "다시 시도",
        cancelText: "저장하기",
        isDanger: false,
        onConfirm: retryMelodyAnalysis,
        onCancel: () => {
          setTimeout(() => {
            setIsSongSelectOpen(true);
          }, 50);
        },
      });
    }
  };

  const handleTryClose = () => {
    openModal("customConfirm", {
      title: "작성 중인 감정기록이 있어요!",
      message: "작성 중인 내용은 저장되지 않습니다.\n 작성을 중단하시겠어요?",
      onConfirm: () => {
        setIsWriting(false);
        onEdit();
      },
      onCancel: () => {},
      confirmText: "중단하기",
      cancelText: "취소",
      isDanger: true,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={handleTryClose}
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
              onClick={analyzeMusic}
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

      <SongSelectModal
        isOpen={isSongSelectOpen}
        onClose={() => setIsSongSelectOpen(false)}
        songs={cachedValidSongs.current}
        onConfirm={(selected) => {
          setIsSongSelectOpen(false);
          onCompleteMusic({
            ...selected,
            title: selected.title.replace(/^\*/, ""),
          });
        }}
        onRetry={retryMelodyAnalysis}
      />
    </div>
  );
};

export default DiaryContentPreview;
