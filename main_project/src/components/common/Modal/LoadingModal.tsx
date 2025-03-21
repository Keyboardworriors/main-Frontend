import BaseModal from "./BaseModal";

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, message }) => {
  return (
    <BaseModal isOpen={isOpen} hideCloseButton={true}>
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">{message}</h2>
      <div className="flex justify-center mb-4">
        <div className="animate-spin">
          <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
            <circle cx="12" cy="12" r="1" fill="black" />
            <circle cx="12" cy="7" r="1.5" fill="black" />
            <circle cx="17" cy="12" r="1.5" fill="black" />
            <circle cx="12" cy="17" r="1.5" fill="black" />
            <circle cx="7" cy="12" r="1.5" fill="black" />
            <circle cx="16" cy="8" r="1.5" fill="black" />
            <circle cx="16" cy="16" r="1.5" fill="black" />
            <circle cx="8" cy="16" r="1.5" fill="black" />
            <circle cx="8" cy="8" r="1.5" fill="black" />
          </svg>
        </div>
      </div>
      <p className="text-center text-gray-600"></p>
    </BaseModal>
  );
};

export default LoadingModal;
