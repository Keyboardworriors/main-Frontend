import { useModalStore } from "../../../store/modal";
import { createPortal } from "react-dom";

interface CustomConfirmModalProps {
  type?: string;
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isDanger?: boolean;
}

const CustomConfirmModal = ({
  type = "customConfirm",
  isOpen: propIsOpen,
  onClose: propOnClose,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  isDanger = false,
}: CustomConfirmModalProps) => {
  const { isOpen: storeIsOpen, type: storeType, closeModal } = useModalStore();

  const isOpen = propIsOpen !== undefined ? propIsOpen : storeIsOpen && storeType === type;
  const onClose = propOnClose || closeModal;

  if (!isOpen) return null;

  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  return createPortal(
    <div className="bg-black/50 rounded-xl w-full h-full p-10 inset-0 flex justify-center items-center pointer-events-auto">
      <div className="w-full absolute inset-0 rounded-xl"></div>
      <div className="relative flex flex-col items-center z-10">
        <div className="p-8 bg-white rounded-xl max-w-md w-full shadow-lg">
          <h3 className="text-center font-bold text-xl mb-5">{title}</h3>

          <div className="text-center text-gray-600 mb-8">{message}</div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-6 shadow-md rounded-full bg-white text-gray-700 border border-black font-medium hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-colors shadow-md bg-[#7698CC] text-white hover:bg-[#6387BB]`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalContainer,
  );
};

export default CustomConfirmModal;
