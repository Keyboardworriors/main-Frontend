import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const BaseModal = ({ isOpen, onClose, children, hideCloseButton = false }: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousOverflowStyle = useRef<string | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && onClose) onClose();
  };

  const manageScrollbar = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousOverflowStyle.current = document.body.style.overflow;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  };

  const restoreScrollbar = () => {
    document.body.style.paddingRight = "";
  };

  useEffect(() => {
    if (!isOpen) return;

    if (onClose) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    manageScrollbar();

    return () => {
      if (onClose) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      }
      restoreScrollbar();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return null;

  return createPortal(
    <div className="rounded-xl bg-white w-full h-full p-10 inset-0 flex justify-center items-center pointer-events-auto">
      <div className="bg-white w-full absolute inset-0 rounded-xl"></div>
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
