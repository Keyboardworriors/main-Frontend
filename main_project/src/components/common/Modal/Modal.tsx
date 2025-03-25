import { useModalStore } from "../../../store/modal";
import LoadingModal from "./LoadingModal";
import ConfirmModal from "./ConfirmModal";
import ProfileModal from "./ProfileModal";
import SongSelectModal from "./SongSelectModal";
import SongAnalysisErrorModal from "./SongAnalysisErrorModal";

const Modal = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  const getLoadingMessage = () => {
    // 메시지가 직접 제공된 경우 우선 사용
    if (data?.message) return data.message;

    // modalPurpose에 따른 기본 메시지 제공
    switch (data?.modalPurpose) {
      case "chart":
        return "차트를 분석중이에요";
      case "mood":
        return "감정을 분석중이에요";
      case "melody":
        return "추천 필로디를 찾고 있어요";
      case "saving":
        return "기록을 저장중이에요";
      default:
        return "로딩 중...";
    }
  };

  const getConfirmSettings = () => {
    // 기본 설정
    const defaultSettings = {
      message: data?.message || "확인하시겠습니까?",
      confirmText: data?.confirmText || "확인",
      cancelText: data?.cancelText || "취소",
      isDanger: data?.isDanger || false,
    };

    // modalPurpose에 따른 설정
    if (data?.modalPurpose === "withdraw") {
      return {
        message: "기록을 중단하시겠습니까?",
        confirmText: "탈퇴하기",
        cancelText: "취소하기",
        isDanger: true,
      };
    } else if (data?.modalPurpose === "saveDiary") {
      return {
        message: "일기를 저장할까요? 저장된 기록은 수정이 불가해요!",
        confirmText: "저장하기",
        cancelText: "취소하기",
        isDanger: false,
      };
    }

    return defaultSettings;
  };

  // 타입에 따른 적절한 모달 컴포넌트 렌더링
  switch (type) {
    case "loading":
      return <LoadingModal isOpen={isOpen} message={getLoadingMessage()} />;

    case "confirm":
      // 노래 분석 에러 모달
      if (data?.modalPurpose === "songAnalysisError") {
        return (
          <SongAnalysisErrorModal
            isOpen={isOpen}
            onClose={closeModal}
            onRetry={data?.onRetry}
            message={data?.message}
          />
        );
      } else {
        const settings = getConfirmSettings();
        return (
          <ConfirmModal
            isOpen={isOpen}
            onClose={closeModal}
            onConfirm={data?.onConfirm || (() => {})}
            message={settings.message}
            confirmText={settings.confirmText}
            cancelText={settings.cancelText}
            isDanger={settings.isDanger}
          />
        );
      }

    case "profile":
      return (
        <ProfileModal isOpen={isOpen} onClose={closeModal} user={data?.user || { nickname: "" }} />
      );

    case "songSelect":
      return <SongSelectModal />;

    case "moodSelect":
      // 구현 중
      return null;

    default:
      return null;
  }
};

export default Modal;
