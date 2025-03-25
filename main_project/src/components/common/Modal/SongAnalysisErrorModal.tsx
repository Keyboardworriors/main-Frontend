import BaseModal from "./BaseModal";

interface SongAnalysisErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  message?: string;
}

const SongAnalysisErrorModal = ({ isOpen, onClose, onRetry }: SongAnalysisErrorModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="py-8 px-6 text-center max-w-lg mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8">⚠️ 404 (Not found)</h2>
          <p className="text-gray-500 text-base mb-8">
            음악 추천에 실패했어요.. <br />
            다시 분석을 원하시면 다시 시도, <br />
            그렇지 않다면 저장하기를 클릭해주세요!
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-6">
          <button
            onClick={onClose}
            className="px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-gray-700 bg-white text-gray-700 font-medium text-lg md:text-xl hover:bg-gray-50 transition-colors min-w-[140px] md:min-w-[180px] shadow-md"
          >
            다시 시도
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 md:px-10 py-3 md:py-4 bg-[#7698CC] text-white rounded-full font-medium text-lg md:text-xl hover:bg-[#6387BB] transition-colors min-w-[140px] md:min-w-[180px] shadow-md"
            >
              다시 분석하기
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default SongAnalysisErrorModal;
