import { useModalStore } from "../../store/modal";
import { useState } from "react";

// 테스트 끝나고 삭제하겠습니다 !
const Footer = () => {
  const { openModal, closeModal } = useModalStore();
  const [showTestButtons, setShowTestButtons] = useState(false);

  const toggleTestButtons = () => {
    setShowTestButtons(!showTestButtons);
  };

  const testSongSelectModal = () => {
    openModal("songSelect", {
      onConfirm: () => {
        closeModal();
        alert("노래가 선택되었습니다!");
      },
      onRetry: () => {
        closeModal();
        openModal("loading", { message: "추천 필로디를 찾고 있어요" });
        setTimeout(() => {
          closeModal();
          testSongSelectModal();
        }, 1500);
      },
    });
  };

  const testSongAnalysisErrorModal = () => {
    openModal("confirm", {
      modalPurpose: "songAnalysisError",
      message: "추천 필로디를 찾을 수 없어요",
      onRetry: () => {
        closeModal();
        openModal("loading", { message: "다시 분석 중이예요!" });
        setTimeout(() => {
          closeModal();
          testSongSelectModal();
        }, 1500);
      },
    });
  };

  return (
    <>
      <footer className="relative">
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={toggleTestButtons}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            {showTestButtons ? "✕" : "test"}
          </button>

          {showTestButtons && (
            <div className="absolute bottom-12 right-0 bg-white p-4 rounded-lg shadow-lg border w-48">
              <p className="text-sm font-bold mb-2">모달 테스트</p>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("loading", { message: "추천 필로디 🎵" })}
                  className="w-full py-1 bg-red-500 text-white text-sm rounded"
                >
                  로딩 모달
                </button>
                <button
                  onClick={testSongSelectModal}
                  className="w-full py-1 bg-red-500 text-white text-sm rounded"
                >
                  노래 선택 모달
                </button>
                <button
                  onClick={testSongAnalysisErrorModal}
                  className="w-full py-1 bg-red-500 text-white text-sm rounded"
                >
                  노래 에러 모달
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
