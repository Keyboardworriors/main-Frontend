import { useState, useEffect } from "react";
import DiaryWrite from "./DiaryWrite";
import DiaryContentPreview from "./DiaryContent";
import DiaryMusic from "./DiaryMusic";
import DiaryComplete from "./DiaryComplete";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useDiaryStore } from "../store/diary";
import diaryApi from "../api/diaryApi";
import { format } from "date-fns";

interface DiaryControlProps {
  selectedDate: Date;
  onCancel: () => void;
}

const DiaryControl = ({ selectedDate, onCancel }: DiaryControlProps) => {
  const [currentStep, setCurrentStep] = useState<"writing" | "content" | "music" | "complete">("writing");
  const [diaryContent, setDiaryContent] = useState<DiaryContentType>({
    diary_title: "",
    content: "",
    moods: [],
  });
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const setIsWriting = useDiaryStore((state) => state.setIsWriting);

  useEffect(() => {
    setIsWriting(true);
  }, [currentStep, setIsWriting]);

  const handleDiaryWriteComplete = (content: DiaryContentType) => {
    setDiaryContent(content);
    setCurrentStep("content");
  };

  const handleEditDiary = () => {
    setCurrentStep("writing");
  };

  const handleMusicSelected = (music: Music) => {
    console.log("[DiaryControl] handleMusicSelected 실행됨", music);
    setSelectedMusic(music);
    setCurrentStep("complete");
  };

  const handleSaveDiary = async () => {
    const payload = {
      diary_title: diaryContent.diary_title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      date: format(selectedDate, "yyyy-MM-dd"),
      rec_music:
        selectedMusic && selectedMusic.title
          ? {
              ...selectedMusic,
              title: selectedMusic.title.replace(/^\*+/, "").trim(),
            }
          : null,
    };

    try {
      openModal("loading", {
        message: "소중한 감정을 기록중이에요",
        modalPurpose: "saving",
      });

      await diaryApi.createDiary(payload);

      closeModal();
      queryClient.invalidateQueries({ queryKey: ["diaryDates"] });
      setIsWriting(false);
      onCancel();
    } catch (error) {
      console.error("일기 저장 실패:", error);
      closeModal();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "writing":
        return (
          <DiaryWrite
            selectedDate={selectedDate}
            onCancel={onCancel}
            onDiaryComplete={handleDiaryWriteComplete}
          />
        );
      case "content":
        return (
          <DiaryContentPreview
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            onEdit={handleEditDiary}
            onCompleteMusic={handleMusicSelected}
          />
        );
      case "music":
        return (
          <DiaryMusic
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            onBack={handleEditDiary}
            onComplete={handleMusicSelected}
          />
        );
      case "complete":
        return (
          <DiaryComplete
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            selectedMusic={selectedMusic}
            onBack={() => setCurrentStep("music")}
            onSave={handleSaveDiary} 
          />
        );
    }
  };

  return <div className="w-full h-full">{renderStep()}</div>;
};

export default DiaryControl;
