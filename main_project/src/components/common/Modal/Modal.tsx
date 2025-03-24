import { useModalStore } from "../../../store/modal";
import LoadingModal from "./LoadingModal";
import ConfirmModal from "./ConfirmModal";
import ProfileModal from "./ProfileModal";

const Modal: React.FC = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  // 로딩 모달 메시지 가져오기 함수
  const getLoadingMessage = () => {
    // 메시지가 직접 제공된 경우 우선 사용
    if (data?.message) return data.message;

    // modalPurpose에 따른 기본 메시지 제공
    switch (data?.modalPurpose) {
      case "chart":
        return "차트를 분석중이에요";
      case "emotion":
        return "감정을 분석중이에요";
      case "melody":
        return "추천 필로디를 찾고 있어요";
      case "saving":
        return "기록을 저장중이에요";
      default:
        return "로딩 중...";
    }
  };

  // 확인 모달 설정 가져오기
  const getConfirmSettings = () => {
    // 기본 설정
    const defaultSettings = {
      message: data?.message || "확인하시겠습니까?",
      confirmText: data?.confirmText || "확인",
      cancelText: data?.cancelText || "취소",
      isDanger: data?.isDanger || false,
    };

    // modalPurpose에 따른 특별 설정
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

  switch (type) {
    case "loading":
      return <LoadingModal isOpen={isOpen} message={getLoadingMessage()} />;

    case "confirm": {
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

    // 다른 모달 타입은 추후 구현 예정
    default:
      return null;
  }
};

export default Modal;
