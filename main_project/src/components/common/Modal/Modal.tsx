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
          onConfirm={data?.onConfirm ?? (() => {})}
          onCancel={data?.onCancel ?? (() => {})}
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
          message={
            data?.message ?? "이동하면 작성 중인 내용이 사라질 수 있어요.\n정말 이동하시겠어요?"
          }
          confirmText={data?.confirmText}
          cancelText={data?.cancelText}
          onConfirm={data?.onConfirm ?? (() => {})}
          onCancel={data?.onCancel ?? (() => {})}
          isDanger={data?.isDanger}
        />
      );

    case "songSelect":
      return (
        <SongSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          songs={data?.songs ?? []}
          onConfirm={data?.onConfirm}
          onRetry={data?.onRetry}
        />
      );

    case "moodSelect":
      return (
        <MoodSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          onSelect={data?.onSelect ?? (() => {})}
          onSave={data?.onSave ?? (() => {})}
          moods={data?.moods ?? []}
          isAnalysisFailed={data?.isAnalysisFailed ?? false}
          analyzedMood={data?.analyzedMood}
          isDirectSelect={data?.isDirectSelect ?? false}
        />
      );

    case "profile":
      if (!data?.user) return null;
      return <ProfileModal isOpen={isOpen} onClose={closeModal} user={data.user} />;

    case "loading":
      if (!data?.message) return null;
      return <LoadingModal isOpen={isOpen} message={data.message} />;

    default:
      return null;
  }
};

export default Modal;
