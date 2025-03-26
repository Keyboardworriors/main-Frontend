import BaseModal from "./BaseModal";

interface SongAnalysisErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  message?: string;
}

const SongAnalysisErrorModal = ({
  isOpen,
  onClose,
  onRetry,
  message = "음악 추천에 실패했어요..",
}: SongAnalysisErrorModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="py-8 px-6 text-center max-w-lg mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8">⚠️ 404 (Not found)</h2>
          <p className="text-gray-500 text-base mb-8">
            {message} <br />
            다시 분석을 원하시면 다시 시도, <br />
            그렇지 않다면 저장하기를 클릭해주세요!
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onRetry}
            className="px-4 py-2.5 rounded-full border border-gray-700 bg-white text-gray-700 font-medium text-lg hover:bg-gray-50 transition-colors min-w-[120px] shadow-sm"
          >
            다시 분석하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#7698CC] text-white rounded-full font-medium text-lg hover:bg-[#6387BB] transition-colors min-w-[120px] shadow-sm"
          >
            저장하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SongAnalysisErrorModal;
