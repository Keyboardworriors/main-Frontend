import BaseModal from "./BaseModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  isDanger = false,
}: ConfirmModalProps) => {
  // 버튼 렌더링 함수
  const renderButtons = () => (
    <div className="flex justify-end mt-6 space-x-3">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        className={`px-4 py-2 rounded-md transition-colors ${
          isDanger
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="py-4">
        <p className="text-lg text-center mb-6">{message}</p>
        {renderButtons()}
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
