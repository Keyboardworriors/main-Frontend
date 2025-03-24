import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

interface DiaryWriteProps {
  selectedDate: Date;
  onCancel: () => void;
}

interface DiaryContent {
  title: string;
  content: string;
  emotion?: string;
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
  });

  const editor = useEditor({
    ...editorConfig,
    onUpdate: ({ editor }) => {
      setDiaryContent((prev) => ({
        ...prev,
        content: editor.getText(),
      }));
    },
  });

  const formattedDate = dayjs(selectedDate).format("YYYY년 MM월 DD일 dddd");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryContent((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleEmotionSelect = () => {
    // Todo:감정 선택 로직 구현 예정
    console.log("감정 선택");
  };

  const handleEmotionAnalysis = () => {
    // Todo:감정 분석 로직 구현 예정
    console.log("감정 분석");
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
    </div>
  );
};

export default DiaryWrite;
