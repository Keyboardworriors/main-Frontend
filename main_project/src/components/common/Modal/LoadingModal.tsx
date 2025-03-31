import { useEffect, ReactNode } from "react";
import BaseModal from "./BaseModal";

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
}

const KEYFRAMES_ID = "loading-animation-style";
const KEYFRAMES_CONTENT = `
  @keyframes floatAnimation {
    0%, 100% {
      transform: translateY(0);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-12px);
      opacity: 1;
    }
  }
`;

const COMMON_NOTE_STYLE = {
  marginLeft: "-5px",
  marginRight: "-5px",
  animation: "floatAnimation 0.7s ease-in-out infinite",
};

interface MusicNoteProps {
  delay: string;
  svg: ReactNode;
}

const MusicNote = ({ delay, svg }: MusicNoteProps) => (
  <div
    style={{
      ...COMMON_NOTE_STYLE,
      animationDelay: delay,
    }}
  >
    {svg}
  </div>
);

const LoadingModal = ({ isOpen, message }: LoadingModalProps) => {
  useEffect(() => {
    if (!document.getElementById(KEYFRAMES_ID)) {
      const styleElement = document.createElement("style");
      styleElement.id = KEYFRAMES_ID;
      styleElement.textContent = KEYFRAMES_CONTENT;
      document.head.appendChild(styleElement);
    }

    return () => {
      const styleElement = document.getElementById(KEYFRAMES_ID);
      if (styleElement && document.querySelectorAll("[data-modal-type='loading']").length <= 1) {
        styleElement.remove();
      }
    };
  }, []);

  const notes = [
    <svg
      key="note2"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="#A6CCF2"
      viewBox="0 0 256 256"
    >
      <path d="M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V98.75l69.7,20.91A8,8,0,0,0,216,112V64A8,8,0,0,0,210.3,56.34Z" />
    </svg>,
    <svg
      key="note3"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="#A6CCF2"
      viewBox="0 0 256 256"
    >
      <path d="M212.92,17.71a7.89,7.89,0,0,0-6.86-1.46l-128,32A8,8,0,0,0,72,56V166.1A36,36,0,1,0,88,196V102.25l112-28V134.1A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.71Z" />
    </svg>,
    <svg
      key="note1"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="#A6CCF2"
      viewBox="0 0 256 256"
    >
      <path d="M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V50.75l69.7,20.91a8,8,0,1,0,4.6-15.32Z" />
    </svg>,
  ];

  return (
    <BaseModal isOpen={isOpen} hideCloseButton>
      <div className="flex flex-col items-center py-6" data-modal-type="loading">
        <h2 className="text-2xl font-semibold text-center mb-6">{message}</h2>
        <div className="flex items-center justify-center h-28">
          <MusicNote delay="0s" svg={notes[0]} />
          <MusicNote delay="0.15s" svg={notes[1]} />
          <MusicNote delay="0.3s" svg={notes[2]} />
        </div>
      </div>
    </BaseModal>
  );
};

export default LoadingModal;
