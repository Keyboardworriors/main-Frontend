import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import diaryApi from "../api/diaryApi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { formatDateKorean } from "../utils/date";
import { DiaryContent, Mood } from "../models/diary";
import MoodSelectModal from "../components/common/Modal/MoodSelectModal";
import DiaryContentPreview from "./DiaryContent";
import { useModalStore } from "../store/modal";
import { useDiaryStore } from "../store/diary";
import { useConfirmDiaryExit } from "../utils/stopConfirm";

interface DiaryWriteProps {
  selectedDate: Date;
  onCancel: () => void;
  onDiaryComplete?: (content: DiaryContent) => void;
}

const editorConfig = {
  extensions: [StarterKit],
  content: "",
  editorProps: {
    attributes: {
      class: "prose prose-sm focus:outline-none min-h-[180px]",
    },
  },
};

const DiaryWrite = ({ selectedDate, onCancel, onDiaryComplete }: DiaryWriteProps) => {
  const setIsWriting = useDiaryStore((state) => state.setIsWriting);
  const [diaryContent, setDiaryContent] = useState<DiaryContent>({
    diary_title: "",
    content: "",
    moods: [],
  });
  const [analyzedKeywords, setAnalyzedKeywords] = useState<string[]>([]);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isDirectSelect, setIsDirectSelect] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const analyzeMoodMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      diaryApi.analyzeDiaryMood(title, content),
    onSuccess: (res) => {
      console.log("추천받은 감정 키워드:", res);
      setAnalyzedKeywords(res || []);
    },
    onError: () => {
      setAnalyzedKeywords([]);
    },
    onSettled: () => {
      closeModal();
      setIsDirectSelect(false);
      setIsMoodModalOpen(true);
    },
  });

  useEffect(() => {
    setIsWriting(true);
    return () => setIsWriting(false);
  }, [setIsWriting]);

  const editor = useEditor({
    ...editorConfig,
    onUpdate: ({ editor }) => {
      setDiaryContent((prev) => ({
        ...prev,
        content: editor.getText(),
      }));
    },
  });

  const formattedDate = formatDateKorean(selectedDate);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryContent((prev) => ({
      ...prev,
      diary_title: e.target.value,
    }));
  };

  const handleEmotionSelect = () => {
    setIsDirectSelect(true);
    setIsMoodModalOpen(true);
  };

  const handleEmotionAnalysis = async () => {
    if (diaryContent.diary_title.trim().length < 1 || diaryContent.content.trim().length < 30) {
      openModal("customConfirm", {
        message: "감정 분석을 원하시면\n제목과 내용(30자 이상)을 작성해주세요.",
        onConfirm: () => {},
        onCancel: () => {},
      });
      return;
    }

    openModal("loading", {
      message: "감정을 분석중이에요",
      modalPurpose: "mood",
    });

    analyzeMoodMutation.mutate({
      title: diaryContent.diary_title,
      content: diaryContent.content,
    });
  };

  const handleMoodSelect = (mood: string) => {
    setDiaryContent((prev) => {
      if (prev.moods.includes(mood as Mood)) {
        return {
          ...prev,
          moods: prev.moods.filter((m) => m !== mood),
        };
      }
      if (prev.moods.length < 3) {
        return {
          ...prev,
          moods: [...prev.moods, mood as Mood],
        };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    try {
      openModal("loading", {
        message: "기록을 저장중이에요",
        modalPurpose: "saving",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSaved(true);
      queryClient.invalidateQueries({ queryKey: ["diaryDates"] });
      closeModal();

      if (onDiaryComplete) {
        onDiaryComplete(diaryContent);
      }
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error);
      closeModal();
    }
  };

  const handleEdit = () => {
    setIsSaved(false);
    setDiaryContent({
      diary_title: "",
      content: "",
      moods: [],
    });
    editor?.commands.setContent("");
  };

  const handleTryClose = useConfirmDiaryExit(onCancel, {
    title: "작성 중인 감정기록이 있어요!",
    message: "작성 중인 내용은 저장되지 않습니다.\n작성을 중단하시겠어요?",
    confirmText: "중단하기",
    cancelText: "취소",
  });

  if (isSaved) {
    return (
      <DiaryContentPreview
        selectedDate={selectedDate}
        diaryContent={diaryContent}
        onEdit={handleEdit}
        onCompleteMusic={() => {}}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={() => handleTryClose()}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="감정기록의 제목을 입력하세요 (20자 이내로 작성해주세요!)"
        maxLength={20}
        value={diaryContent.diary_title}
        onChange={handleTitleChange}
        className="w-full p-2 text-base font-medium border-b border-[#A6CCF2] focus:outline-none focus:border-[#5E8FBF] mb-3 placeholder:text-base placeholder:font-medium"
      />

      <div className="border border-[#A6CCF2] rounded-lg p-3 mb-3 h-[240px] overflow-y-auto">
        <EditorContent editor={editor} className="h-full text-sm" />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleEmotionSelect}
          disabled={
            diaryContent.diary_title.trim().length < 1 || diaryContent.content.trim().length < 1
          }
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            diaryContent.diary_title.trim().length < 1 || diaryContent.content.trim().length < 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#A6CCF2] hover:bg-[#5E8FBF] text-white"
          }`}
        >
          감정 직접 선택
        </button>
        <button
          onClick={handleEmotionAnalysis}
          disabled={
            diaryContent.diary_title.trim().length < 1 || diaryContent.content.trim().length < 1
          }
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            diaryContent.diary_title.trim().length < 1 || diaryContent.content.trim().length < 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5E8FBF] hover:bg-[#4A7196] text-white"
          }`}
        >
          감정 분석
        </button>
      </div>

      <MoodSelectModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
        onSelect={(mood: Mood) => handleMoodSelect(mood)}
        moods={Object.values(Mood)}
        isAnalysisFailed={analyzedKeywords.length === 0 && !isDirectSelect}
        isDirectSelect={isDirectSelect}
        onDirectSelect={() => setIsDirectSelect(true)}
        onSave={handleSave}
        analyzedKeywords={analyzedKeywords}
      />
    </div>
  );
};

export default DiaryWrite;
