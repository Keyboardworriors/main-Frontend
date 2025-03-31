import { useState } from "react";
import DiaryWrite from "./DiaryWrite";
import DiaryContentPreview from "./DiaryContent";
import DiaryMusic from "./DiaryMusic";
import DiaryComplete from "./DiaryComplete";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";
import { useModalStore } from "../store/modal";

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
    console.log("선택된 음악:", music);
  };

  const handleComplete = async () => {
    /*const payload = {
      date: selectedDate.toISOString(),
      diary_title: diaryContent.diary_title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      rec_music: selectedMusic && selectedMusic.title ? [selectedMusic] : [], // 음악없이 저장한 경우도 안전하게 처리
    };*/

    openModal("loading", {
      message: "소중한 감정을 기록중이에요",
      modalPurpose: "saving",
    });
    setTimeout(() => {
      closeModal();
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
            onFinish={handleComplete}
            onBack={() => setCurrentStep("music")}
          />
        );
    }
  };

  return <div className="w-full h-full">{renderStep()}</div>;
};

export default DiaryControl;
