import BaseModal from "./BaseModal";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const bounceKeyframes = `
  @keyframes note-bounce {
    0%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }
`;

const LoadingModal = ({ isOpen, message = "로딩 중입니다..." }: LoadingModalProps) => {
  return (
    <BaseModal isOpen={isOpen} hideCloseButton>
      {/* 키프레임을 직접 style로 삽입 */}
      <style>{bounceKeyframes}</style>

      <div className="flex flex-col items-center justify-center py-8 px-6 w-[240px]">
        <div className="flex space-x-2 mb-4">
          {[0, 0.2, 0.4].map((delay, index) => (
            <svg
              key={index}
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="#4A7196"
              style={{
                opacity: 0.4,
                animation: "note-bounce 1s infinite ease-in-out",
                animationDelay: `${delay}s`,
              }}
            >
              <path d="M9 3v12a4 4 0 1 0 2-3.465V6h4V3H9z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-gray-700 text-center whitespace-pre-line">{message}</p>
      </div>
    </BaseModal>
  );
};

export default LoadingModal;
