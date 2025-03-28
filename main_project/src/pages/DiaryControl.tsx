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
    title: "",
    content: "",
    moods: [],
  });
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  const { openModal, closeModal } = useModalStore(); // ✅ 모달 제어

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

  // 4단계: 최종 저장
  const handleComplete = async () => {
    const payload = {
      diary_title: diaryContent.title,
      content: diaryContent.content,
      moods: diaryContent.moods,
      rec_music: selectedMusic ? [selectedMusic] : [],
    };

    // ✅ 1) 로딩 모달 표시
    openModal("loading", {
      message: "소중한 감정을 기록중이에요",
      modalPurpose: "saving",
    });

    // ✅ 2) 저장 로직 시뮬레이션 (실제 호출은 주석처리)
    setTimeout(() => {
      // 실제 서버 저장 요청 예시
      // try {
      //   const response = await axios.post("/api/diary/create", payload);
      //   console.log("저장 성공:", response.data);
      // } catch (error) {
      //   console.error("저장 실패:", error);
      // }

      // ✅ 3) 콘솔에 최종 데이터 출력
      console.log("📘 일기 저장됨:", payload);

      // ✅ 4) 로딩 모달 닫고 작성 종료
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
            onContinueToMusic={handleContinueToMusic}
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
