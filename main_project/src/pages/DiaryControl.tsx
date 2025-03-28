import { useState } from "react";
import DiaryWrite from "./DiaryWrite";
import DiaryContentPreview from "./DiaryContent";
import DiaryMusic from "./DiaryMusic";
import DiaryComplete from "./DiaryComplete";
import { DiaryContent as DiaryContentType, Music } from "../models/diary";

interface DiaryControlProps {
  selectedDate: Date;
  onCancel: () => void;
}

const DiaryControl = ({ selectedDate, onCancel }: DiaryControlProps) => {
  const [currentStep, setCurrentStep] = useState<"writing" | "content" | "music" | "complete">(
    "writing",
  );

  const [diaryContent, setDiaryContent] = useState<DiaryContentType>({
    title: "",
    content: "",
    moods: [],
  });

  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  // 1단계: 작성 완료
  const handleDiaryWriteComplete = (content: DiaryContentType) => {
    setDiaryContent(content);
    setCurrentStep("content");
  };

  // 2단계: 수정 → 작성으로 돌아감
  const handleEditDiary = () => {
    setCurrentStep("writing");
  };

  // 2단계 → 3단계: 음악 분석 시작
  const handleContinueToMusic = () => {
    setCurrentStep("music");
  };

  // 3단계: 음악 선택 완료 시 처리 (선택된 음악이 직접 전달됨)
  const handleMusicSelected = (music: Music) => {
    setSelectedMusic(music);
    setCurrentStep("complete");
  };

  // 4단계: 최종 저장 (axios 호출 주석 처리)
  const handleComplete = async () => {
    const payload = {
      diary_title: diaryContent.title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      rec_music: selectedMusic ? [selectedMusic] : [],
    };

    // 실제 서버에 저장 요청 (주석처리)
    // try {
    //   const response = await axios.post("/api/diary/create", payload);
    //   console.log("저장 성공:", response.data);
    // } catch (error) {
    //   console.error("저장 실패:", error);
    // }

    // 저장 후 작성 종료 처리
    onCancel();
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
            onContinueToMusic={handleContinueToMusic}
          />
        );
      case "music":
        return (
          <DiaryMusic
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            onBack={handleEditDiary}
            onComplete={handleMusicSelected} // 이제 이 콜백으로 선택된 음악을 직접 전달받음
          />
        );
      case "complete":
        return (
          <DiaryComplete
            selectedDate={selectedDate}
            diaryContent={diaryContent}
            selectedMusic={selectedMusic}
            onFinish={handleComplete}
            onBack={() => setCurrentStep("music")} // 이전으로
          />
        );
    }
  };

  return <div className="w-full h-full">{renderStep()}</div>;
};

export default DiaryControl;
