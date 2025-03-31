import { useModalStore } from "../../../store/modal";
// import BaseModal from "./BaseModal";
import LoadingModal from "./LoadingModal";
import ConfirmModal from "./ConfirmModal";
import CustomConfirmModal from "./CustomConfirmModal";
import SongSelectModal from "./SongSelectModal";
import MoodSelectModal from "./MoodSelectModal";
import ProfileModal from "./ProfileModal";

const Modal = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  if (!isOpen || !type) return null;

  switch (type) {
    case "confirm":
      return (
        <ConfirmModal
          isOpen={isOpen}
          onClose={closeModal}
          message={data?.message ?? ""}
          onConfirm={data?.onConfirm ?? (() => {})} // undefined일 경우를 대비한 기본값 추가
          confirmText={data?.confirmText}
          cancelText={data?.cancelText}
          isDanger={data?.isDanger}
        />
      );

    case "customConfirm":
      return (
        <CustomConfirmModal
          isOpen={isOpen}
          onClose={closeModal}
          title={data?.title ?? ""}
          message={data?.message ?? ""}
          confirmText={data?.confirmText}
          cancelText={data?.cancelText}
          onConfirm={data?.onConfirm ?? (() => {})} // 기본값 함수 추가
          onCancel={data?.onCancel ?? (() => {})} // 기본값 함수 추가
          isDanger={data?.isDanger}
        />
      );

    case "songSelect":
      return (
        <SongSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          songs={data?.songs ?? []}
          onConfirm={data?.onConfirm} // 타입에서 선택적이므로 그대로 전달
          onRetry={data?.onRetry} // 타입에서 선택적이므로 그대로 전달
        />
      );

    case "moodSelect":
      return (
        <MoodSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          onSelect={data?.onSelect ?? (() => {})} // 타입 에러 방지를 위한 기본 함수 추가
          onSave={data?.onSave ?? (() => {})} // 타입 에러 방지를 위한 기본 함수 추가
          moods={data?.moods ?? []}
          isAnalysisFailed={data?.isAnalysisFailed ?? false}
          analyzedMood={data?.analyzedMood} // 타입 수정 (MoodSelectModal에서 analyzedMood: string[] | undefined 허용되도록 수정)
          isDirectSelect={data?.isDirectSelect ?? false}
        />
      );

    case "profile":
      if (!data?.user) return null; // user가 undefined일 경우 ProfileModal 렌더링 방지
      return <ProfileModal isOpen={isOpen} onClose={closeModal} user={data.user} />;

    case "loading":
      if (!data?.message) return null; // message가 없으면 LoadingModal 렌더링 방지
      return <LoadingModal isOpen={isOpen} message={data.message} />;

    default:
      return null;
  }
};

export default Modal;
