import { useEffect } from "react";
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
  children: React.ReactNode;
}

const MusicNote = ({ delay, children }: MusicNoteProps) => (
  <div
    style={{
      ...COMMON_NOTE_STYLE,
      animationDelay: delay,
    }}
  >
    {children}
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

  return (
    <BaseModal isOpen={isOpen} hideCloseButton={true}>
      <div className="flex flex-col items-center py-6" data-modal-type="loading">
        <h2 className="text-2xl font-bold text-center mb-8">{message}</h2>
        <div className="flex items-center justify-center h-28">
          <MusicNote delay="0s">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C7.433 14 9 15.567 9 17.5Z"
                fill="#A6CCF2"
              />
              <path
                d="M19 16.5C19 18.433 17.433 20 15.5 20C13.567 20 12 18.433 12 16.5C12 14.567 13.567 13 15.5 13C17.433 13 19 14.567 19 16.5Z"
                fill="#A6CCF2"
              />
              <path d="M9 17.5V3.5H19V16.5" stroke="#A6CCF2" strokeWidth="2" />
            </svg>
          </MusicNote>

          <MusicNote delay="0.15s">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 20C12.5 21.933 10.933 23.5 9 23.5C7.067 23.5 5.5 21.933 5.5 20C5.5 18.067 7.067 16.5 9 16.5C10.933 16.5 12.5 18.067 12.5 20Z"
                fill="#A6CCF2"
              />
              <path d="M12.5 20V3" stroke="#A6CCF2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </MusicNote>

          <MusicNote delay="0.3s">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18C10 19.933 8.433 21.5 6.5 21.5C4.567 21.5 3 19.933 3 18C3 16.067 4.567 14.5 6.5 14.5C8.433 14.5 10 16.067 10 18Z"
                fill="#A6CCF2"
              />
              <path d="M10 18V4" stroke="#A6CCF2" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 4L18 7" stroke="#A6CCF2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </MusicNote>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoadingModal;
