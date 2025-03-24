import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { formatDate } from "../utils/date";
import { DiaryContent, Mood } from "../models/diary";
import MoodSelectModal from "../components/common/Modal/MoodSelectModal";

interface DiaryWriteProps {
  selectedDate: Date;
  onCancel: () => void;
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

const DiaryWrite = ({ selectedDate, onCancel }: DiaryWriteProps) => {
  const [diaryContent, setDiaryContent] = useState<DiaryContent>({
    title: "",
    content: "",
    moods: [],
  });
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isAnalysisFailed, setIsAnalysisFailed] = useState(false);
  const [analyzedMood, setAnalyzedMood] = useState<string>();
  const [isDirectSelect, setIsDirectSelect] = useState(false);

  const editor = useEditor({
    ...editorConfig,
    onUpdate: ({ editor }) => {
      setDiaryContent((prev) => ({
        ...prev,
        content: editor.getText(),
      }));
    },
  });

  const formattedDate = formatDate(selectedDate);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryContent((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleEmotionSelect = () => {
    setIsAnalysisFailed(false);
    setAnalyzedMood(undefined);
    setIsDirectSelect(true);
    setIsMoodModalOpen(true);
  };

  const handleEmotionAnalysis = async () => {
    try {
      const response = await fetch("api/diary/recommendation-keyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: diaryContent.title,
          content: diaryContent.content,
        }),
      });

      if (!response.ok) {
        throw new Error("감정 분석에 실패했습니다.");
      }

      const data = await response.json();
      setAnalyzedMood(data.mood);
      setIsAnalysisFailed(false);
    } catch {
      setIsAnalysisFailed(true);
      setAnalyzedMood(undefined);
    }
    setIsDirectSelect(false);
    setIsMoodModalOpen(true);
  };

  const handleMoodSelect = (mood: string) => {
    setDiaryContent((prev) => ({
      ...prev,
      moods: [...prev.moods, mood as Mood],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-lg text-[#5E8FBF] font-medium">{formattedDate}</div>
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
        value={diaryContent.title}
        onChange={handleTitleChange}
        className="w-full p-2 text-lg border-b border-[#A6CCF2] focus:outline-none focus:border-[#5E8FBF] mb-3"
      />

      <div className="border border-[#A6CCF2] rounded-lg p-3 mb-3 h-[240px] overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleEmotionSelect}
          className="px-3 py-1.5 bg-[#A6CCF2] text-white rounded-full hover:bg-[#5E8FBF] transition-colors text-sm"
        >
          감정 직접 선택
        </button>
        <button
          onClick={handleEmotionAnalysis}
          className="px-3 py-1.5 bg-[#5E8FBF] text-white rounded-full hover:bg-[#4A7196] transition-colors text-sm"
        >
          감정 분석
        </button>
      </div>

      <MoodSelectModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
        onSelect={handleMoodSelect}
        moods={Object.values(Mood)}
        isAnalysisFailed={isAnalysisFailed}
        analyzedMood={analyzedMood}
        isDirectSelect={isDirectSelect}
      />
    </div>
  );
};

export default DiaryWrite;
