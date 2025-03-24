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

  // 모달 외부 클릭 핸들러
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
      onClose();
    }
  };

  // 키보드 Escape 키 핸들러
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && onClose) onClose();
  };

  // 스크롤바 관리 함수
  const manageScrollbar = () => {
    // 현재 스크롤바 상태 저장 및 스크롤 방지
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousOverflowStyle.current = document.body.style.overflow;

    // 스크롤바 너비만큼 패딩 추가하여 페이지 점프 방지
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  };

  // 스크롤바 상태 복원 함수
  const restoreScrollbar = () => {
    document.body.style.overflow = previousOverflowStyle.current || "";
    document.body.style.paddingRight = "";
  };

  // 모달 열릴 때 이벤트 리스너 등록 및 스크롤바 관리
  useEffect(() => {
    if (!isOpen) return;

    // 이벤트 리스너 등록
    if (onClose) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 스크롤바 관리
    manageScrollbar();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 스크롤바 복원
    return () => {
      if (onClose) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      }
      restoreScrollbar();
    };
  }, [isOpen, onClose]);

  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 모달 컨테이너 요소 찾기
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
