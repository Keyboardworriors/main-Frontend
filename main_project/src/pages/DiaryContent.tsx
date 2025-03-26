import { formatDateKorean } from "../utils/date";
import { DiaryContent as DiaryContentType } from "../models/diary";
import { useModalStore } from "../store/modal"; // 모달 스토어 추가

type DiaryContentPreviewProps = {
  selectedDate: Date;
  diaryContent: DiaryContentType;
  onEdit: () => void;
};

const DiaryContentPreview = ({ selectedDate, diaryContent, onEdit }: DiaryContentPreviewProps) => {
  const formattedDate = formatDateKorean(selectedDate);
  const { openModal, closeModal } = useModalStore(); // 모달 스토어 추가

  // 필로디 버튼 클릭 핸들러 추가
  const handleMelodyRecommendation = async () => {
    try {
      // 로딩 모달 표시 추가
      openModal("loading", {
        message: "추천 필로디 🎵",
        modalPurpose: "melody",
      });

      // API 호출 대신 테스트용 지연 (실제 API 연결 시 삭제 요망)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 여기에 실제 API 호출 코드 들어감

      // 로딩 모달 닫기 추가
      closeModal();

      const isSuccess = Math.random() > 0.3; // 70% 확률로 성공하는 페이크 코드 추가 (API 연결 시 삭제요망)

      if (isSuccess) {
        // 노래 선택 모달 열기
        openModal("songSelect", {
          // songs: data.rec_music, <- 실제 데이터 사용 시
          onConfirm: () => {
            console.log("노래 선택 완료");
            // 여기에 선택된 노래와 일기를 업데이트하는 로직을 추가
          },
        });
      } else {
        // 노래 분석 실패 시 에러 모달 열기 추가
        openModal("confirm", {
          modalPurpose: "songAnalysisError",
          onRetry: () => {
            handleMelodyRecommendation();
          },
        });
      }
    } catch (error) {
      console.error("음악 추천 중 오류 발생:", error);
      closeModal();

      // 에러 발생 시 노래 분석 에러 모달 열기 추가
      openModal("confirm", {
        modalPurpose: "songAnalysisError",
        onRetry: () => {
          handleMelodyRecommendation();
        },
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-medium text-[#5E8FBF] font-medium">{formattedDate}</div>
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="창닫기"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[60%]">
          <h2 className="text-base font-medium text-gray-800 mb-4 block border-b border-[#4A7196] px-1">
            {diaryContent.title}
          </h2>
          <div className="border border-[#4A7196] rounded-lg p-3 h-[280px] bg-white overflow-y-auto">
            <div className="prose prose-sm max-w-none h-full text-sm">
              {diaryContent.content.split("\n").map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col justify-between md:pl-2.5 md:pt-10 mt-4 md:mt-0">
          <div>
            <h3 className="text-base text-gray-600 font-semibold mb-3">감정 키워드</h3>
            <div className="flex flex-wrap gap-2">
              {diaryContent.moods.map((mood, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-[#A6CCF2] text-white rounded-full text-sm font-medium min-w-[80px] text-center"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 md:mt-8">
            {/* 필로디 버튼 클릭 핸들러 추가 */}
            <button
              onClick={handleMelodyRecommendation}
              className="px-4 py-2 bg-[#4A7196] text-white rounded-full hover:bg-[#3A5A7A] transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>필로디</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryContentPreview;
