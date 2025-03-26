import { useModalStore } from "../../../store/modal";
import LoadingModal from "./LoadingModal";
import ConfirmModal from "./ConfirmModal";
import ProfileModal from "./ProfileModal";
import SongSelectModal from "./SongSelectModal";
import CustomConfirmModal from "./CustomConfirmModal";

const Modal = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  const getLoadingMessage = () => {
    if (data?.message) return data.message;

    switch (data?.modalPurpose) {
      case "chart":
        return "차트를 분석중이에요";
      case "mood":
        return "감정을 분석중이에요";
      case "melody":
        return "필로디🎵";
      case "saving":
        return "기록을 저장중이에요";
      default:
        return "로딩 중이예요";
    }
  };

  const getConfirmSettings = () => {
    const defaultSettings = {
      message: data?.message || "확인하시겠습니까?",
      confirmText: data?.confirmText || "확인",
      cancelText: data?.cancelText || "취소",
      isDanger: data?.isDanger || false,
    };

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

    case "songAnalysisError":
      return (
        <CustomConfirmModal
          type="songAnalysisError"
          title="⚠️ 404 (Not found)"
          message={
            data?.message ||
            "음악 추천에 실패했어요..<br />다시 분석을 원하시면 다시 시도,<br />그렇지 않다면 저장하기를 클릭해주세요!"
          }
          confirmText="저장하기"
          cancelText="다시 분석하기"
          onConfirm={() => {
            // 저장하기 버튼을 눌렀을 때, 음악 없이 저장하는 콜백 실행
            if (data?.onSaveWithoutMusic) {
              data.onSaveWithoutMusic();
            }
            closeModal();
          }}
          onCancel={data?.onRetry}
          isDanger={false}
        />
      );

    case "confirm":
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

    case "profile":
      return (
        <ProfileModal isOpen={isOpen} onClose={closeModal} user={data?.user || { nickname: "" }} />
      );

    case "songSelect":
      return <SongSelectModal />;

    case "moodSelect":
      return null;

    case "customConfirm":
      return (
        <CustomConfirmModal
          title={data?.title || ""}
          message={data?.message || ""}
          confirmText={data?.confirmText}
          cancelText={data?.cancelText}
          onConfirm={data?.onConfirm || (() => {})}
          isDanger={data?.isDanger}
        />
      );

    default:
      return null;
  }
};

export default Modal;
