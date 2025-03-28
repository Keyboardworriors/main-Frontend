import { useEffect } from "react";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { formatDateKorean } from "../utils/date";

interface DiaryMusicProps {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  onBack: () => void;
  onComplete: (selectedMusic: Music) => void;
}

const dummySongs: Music[] = [
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
  {
    video_id: "lO9d-AJai8Q",
    title: "The Four Seasons",
    artist: "Vivaldi",
    thumbnail: "https://i.ytimg.com/vi/lO9d-AJai8Q/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lO9d-AJai8Q",
  },
];

const DiaryMusic = ({ selectedDate, diaryContent, onBack, onComplete }: DiaryMusicProps) => {
  const { openModal, closeModal } = useModalStore();
  const formattedDate = formatDateKorean(selectedDate);

  const analyzeMusic = () => {
    openModal("loading", {
      message: "추천 필로디 🎵",
      modalPurpose: "melody",
    });

    setTimeout(() => {
      closeModal();

      const isSuccess = true;

      if (isSuccess) {
        openModal("songSelect", {
          songs: dummySongs,
          onConfirm: (selected: Music) => {
            closeModal();
            onComplete(selected);
          },
          onRetry: () => {
            closeModal();
            setTimeout(analyzeMusic, 300);
          },
        });
      } else {
        openModal("songAnalysisError", {
          onRetry: () => {
            closeModal();
            setTimeout(analyzeMusic, 300);
          },
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
    }, 1500);
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
