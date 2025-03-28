import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import diaryApi from "../api/diaryApi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { formatDateKorean } from "../utils/date";
import { DiaryContent, Mood } from "../models/diary";
import MoodSelectModal from "../components/common/Modal/MoodSelectModal";
import DiaryContentPreview from "./DiaryContent";
import { useModalStore } from "../store/modal";
import { useModalStore } from "../store/modal";

interface DiaryWriteProps {
  selectedDate: Date;
  onCancel: () => void;
  onDiaryComplete: (content: DiaryContent) => void;
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
  const [diaryContent, setDiaryContent] = useState<DiaryContent>({
    diary_title: "",
    content: "",
    moods: [],
  });
  const [analyzedKeywords, setAnalyzedKeywords] = useState<string[]>([]);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isAnalysisFailed, setIsAnalysisFailed] = useState(false);
  const [isDirectSelect, setIsDirectSelect] = useState(false);

  const { openModal, closeModal } = useModalStore();
  const analyzeMoodMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      diaryApi.analyzeDiaryMood(title, content),
    onSuccess: (res) => {
      console.log("추천받은 감정 키워드:", res);
      setAnalyzedKeywords(res || []);
      setIsAnalysisFailed(false);
      closeModal();
      setIsDirectSelect(false);
      setIsMoodModalOpen(true);
    },
    onError: () => {
      setIsAnalysisFailed(true);
      closeModal();
      setIsDirectSelect(false);
      setIsMoodModalOpen(true);
    },
  });

  const { openModal, closeModal } = useModalStore();
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
    setDiaryContent((prev) => ({ ...prev, diary_title: e.target.value }));
  };

  const handleEmotionSelect = () => {
    setIsDirectSelect(true);
    setIsAnalysisFailed(false);
    setIsMoodModalOpen(true);
  };

  const handleEmotionAnalysis = async () => {
    openModal("loading", {
      message: "감정을 분석중이에요",
      modalPurpose: "mood",
    });
    analyzeMoodMutation.mutate({
      title: diaryContent.diary_title,
      content: diaryContent.content,
    });
    openModal("loading", {
      message: "감정을 분석중이에요",
      modalPurpose: "mood",
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 더미 분석 결과
    setAnalyzedMood("기쁨");
    setIsAnalysisFailed(false);
    closeModal();
    setIsDirectSelect(false);
    setIsMoodModalOpen(true);
  };

  const handleMoodSelect = (mood: string) => {
    setDiaryContent((prev) => {
      if (prev.moods.includes(mood as Mood)) {
        return { ...prev, moods: prev.moods.filter((m) => m !== mood) };
      }
      if (prev.moods.length < 3) {
        return { ...prev, moods: [...prev.moods, mood as Mood] };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    try {
      // 기록 저장 시 로딩 모달 표시 추가
      openModal("loading", {
        message: "기록을 저장중이에요",
        modalPurpose: "saving",
      });

      // TODO: API 호출하여 일기 저장
      // const response = await fetch("api/diary", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     date: selectedDate,
      //     ...diaryContent,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("일기 저장에 실패했습니다.");
      // }

      // 테스트 확인용으로 지연 추가 (실제 API 연결 시 삭제 요망)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSaved(true);

      closeModal(); // 저장 완료 후 로딩 모달 닫기 추가
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error);

      closeModal(); // 에러 발생 시에도 로딩 모달 닫기 추가
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

  if (isSaved) {
    return (
      <DiaryContentPreview
        selectedDate={selectedDate}
        diaryContent={diaryContent}
        onEdit={handleEdit}
      />
    );
  }
  const handleSave = () => {
    if (diaryContent.moods.length === 0) {
      alert("최소 1개의 감정을 선택해주세요.");
      return;
    }
    onDiaryComplete(diaryContent);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="감정기록의 제목을 입력하세요 (최대 100자)"
        maxLength={100}
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
          disabled={!diaryContent.diary_title.trim() || !diaryContent.content.trim()}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            !diaryContent.diary_title.trim() || !diaryContent.content.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#A6CCF2] hover:bg-[#5E8FBF] text-white"
          }`}
          disabled={!diaryContent.title.trim() || !diaryContent.content.trim()}
          className="px-3 py-1.5 rounded-full text-sm bg-[#A6CCF2] hover:bg-[#5E8FBF] text-white"
        >
          감정 직접 선택
        </button>
        <button
          onClick={handleEmotionAnalysis}
          disabled={!diaryContent.diary_title.trim() || !diaryContent.content.trim()}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            !diaryContent.diary_title.trim() || !diaryContent.content.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5E8FBF] hover:bg-[#4A7196] text-white"
          }`}
          disabled={!diaryContent.title.trim() || !diaryContent.content.trim()}
          className="px-3 py-1.5 rounded-full text-sm bg-[#5E8FBF] hover:bg-[#4A7196] text-white"
        >
          감정 분석
        </button>
      </div>

      <MoodSelectModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
        onSelect={(mood: Mood) => handleMoodSelect(mood)}
        moods={Object.values(Mood)}
        isAnalysisFailed={isAnalysisFailed}
        isDirectSelect={isDirectSelect}
        onSave={handleSave}
        analyzedKeywords={analyzedKeywords}
      />
    </div>
  );
};

export default DiaryWrite;
