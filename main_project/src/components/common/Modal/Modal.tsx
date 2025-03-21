import { useModalStore } from "../../../store/modal";
import LoadingModal from "./LoadingModal";

const Modal: React.FC = () => {
  const { isOpen, type, data, closeModal } = useModalStore();

  if (type === "loading") {
    return <LoadingModal isOpen={isOpen} message={data?.message || "로딩 중..."} />;
  }

  // 다른 타입 모달 예정
  return null;
};

export default Modal;
