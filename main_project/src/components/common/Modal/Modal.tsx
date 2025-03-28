import { useModalStore } from "../../../store/modal";
import BaseModal from "./BaseModal";
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
          onConfirm={data?.onConfirm}
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
          onConfirm={data?.onConfirm}
          onCancel={data?.onCancel}
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
          onRetry={data?.onRetry} // ✅ 다시 시도 콜백 전달
        />
      );
    case "moodSelect":
      return (
        <MoodSelectModal
          isOpen={isOpen}
          onClose={closeModal}
          onSelect={data?.onSelect}
          onSave={data?.onSave}
          moods={data?.moods ?? []}
          isAnalysisFailed={data?.isAnalysisFailed ?? false}
          analyzedMood={data?.analyzedMood}
          isDirectSelect={data?.isDirectSelect ?? false}
        />
      );
    case "profile":
      return <ProfileModal isOpen={isOpen} onClose={closeModal} user={data?.user} />;
    case "songAnalysisError":
      return (
        <BaseModal isOpen={isOpen} onClose={closeModal}>
          <div className="p-6 text-center space-y-4">
            <p className="text-sm text-gray-800">{data?.message ?? "추천된 음악이 없습니다."}</p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => {
                  closeModal();
                  if (window.handleRetryFromComplete) {
                    window.handleRetryFromComplete();
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                다시 시도
              </button>
              <button
                onClick={() => {
                  closeModal();
                  data?.onSaveWithoutMusic?.();
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                음악 없이 저장
              </button>
            </div>
          </div>
        </BaseModal>
      );
    case "loading":
      return <LoadingModal isOpen={isOpen} message={data?.message} />;
    default:
      return null;
  }
};

export default Modal;
