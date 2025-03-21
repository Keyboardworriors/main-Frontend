import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  hideCloseButton = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousOverflowStyle = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
        onClose();
      }
    };

    if (onClose) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 현재 스크롤바 상태 저장 및 스크롤 방지
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousOverflowStyle.current = document.body.style.overflow;

    // 스크롤바 너비만큼 패딩 추가하여 페이지 점프 방지
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      if (onClose) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      }

      document.body.style.overflow = previousOverflowStyle.current || "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContainer = document.getElementById("modal-container");

  if (!modalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-white rounded-xl"></div>
      <div
        ref={modalRef}
        className="relative flex flex-col items-center z-10"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    modalContainer,
  );
};

export default BaseModal;
