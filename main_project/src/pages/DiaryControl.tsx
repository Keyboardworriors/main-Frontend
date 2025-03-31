import { useState } from "react";
import DiaryWrite from "./DiaryWrite";
import DiaryContentPreview from "./DiaryContent";
import DiaryMusic from "./DiaryMusic";
import DiaryComplete from "./DiaryComplete";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";
import { useQueryClient } from "@tanstack/react-query";

interface DiaryControlProps {
  selectedDate: Date;
  onCancel: () => void;
}

const DiaryControl = ({ selectedDate, onCancel }: DiaryControlProps) => {
  const [currentStep, setCurrentStep] = useState<"writing" | "content" | "music" | "complete">(
    "writing",
  );
  const [diaryContent, setDiaryContent] = useState<DiaryContentType>({
    diary_title: "",
    content: "",
    moods: [],
  });
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  const { openModal, closeModal } = useModalStore();

  const handleDiaryWriteComplete = (content: DiaryContentType) => {
    setDiaryContent(content);
    setCurrentStep("content");
  };

  const handleEditDiary = () => {
    setCurrentStep("writing");
  };

  const handleMusicSelected = (music: Music) => {
    setSelectedMusic(music);
    setCurrentStep("complete");
  };

  const queryClient = useQueryClient();

  const handleComplete = async () => {
    openModal("loading", {
      message: "소중한 감정을 기록중이에요",
      modalPurpose: "saving",
    });
    setTimeout(() => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["diaryDates"] });
      onCancel();
    }, 1500);
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
            onCompleteMusic={handleMusicSelected} // 선택된 음악 받음
          />
        );
      case "music":
        return (
          <DiaryMusic
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            onBack={handleEditDiary}
            onComplete={handleMusicSelected} // 여기서도 정확히 넘김
          />
        );
      case "complete":
        return (
          <DiaryComplete
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            selectedMusic={selectedMusic} // 전달된 음악 사용
            onFinish={handleComplete}
            onBack={() => setCurrentStep("music")}
          />
        );
    }
  };

  return <div className="w-full h-full">{renderStep()}</div>;
};

export default DiaryControl;
