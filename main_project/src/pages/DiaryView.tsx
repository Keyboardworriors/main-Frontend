import dayjs from "dayjs";
import { Diary } from "../models/type";
import { Mood } from "../models/type";

const mockDiaryDates: Diary[] = [
  {
    diary_id: 1,
    date: "2025-03-05",
    title: "행복한 날",
    content:
      "오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다!",
    created_At: "2025-03-05T12:00:00Z",
    mood: Mood.HAPPY,
    rec_music: {
      VideoId: "abc123",
      title: "HAPPY",
      artist: "DAY6 (데이식스)",
      thumbnail: "https://www.melon.com/album/detail.htm?albumId=11444397#",
      embedUrl: "https://www.youtube.com/watch?v=sWXGbkM0tBI",
    },
  },
  {
    diary_id: 2,
    date: "2025-03-18",
    title: "행복한 날",
    content: "오늘은 정말 행복한 하루였다!",
    created_At: "2025-03-18T12:00:00Z",
    mood: Mood.HAPPY,
    rec_music: {
      VideoId: "abc123",
      title: "Happy Song",
      artist: "Joyful Band",
      thumbnail: "https://example.com/happy.jpg",
      embedUrl: "https://youtube.com/embed/abc123",
    },
  },
];

interface DiaryViewProps {
  selectedDate: Date | null;
}

const DiaryView: React.FC<DiaryViewProps> = ({ selectedDate }) => {
  const formatDate = (date: Date): string => dayjs(date).format("YYYY-MM-DD");

  const selectedDiary = mockDiaryDates.find(
    (diary) => diary.date === (selectedDate ? formatDate(selectedDate) : ""),
  );

  return (
    <div className="p-4 bg-transparent w-full flex items-center justify-center">
      {selectedDate && (
        <div className="w-full h-full flex flex-col items-center justify-center max-h-96 overflow-auto">
          {selectedDiary ? (
            <div className="w-full max-w-md">
              {/* 추천 음악 썸네일 */}
              <img
                src={selectedDiary.rec_music.thumbnail}
                alt="추천 음악"
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2 border border-gray-200"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {selectedDiary.rec_music.title}
                </p>
                <p className="text-xs text-gray-600">{selectedDiary.rec_music.artist}</p>
              </div>

              {/* 날짜 및 감정 상태 */}
              <p className="text-xs text-gray-500 text-right mt-2">
                {selectedDiary.date} | {selectedDiary.mood}
              </p>

              {/* 일기 제목 및 내용 */}
              <p className="text-base font-semibold mt-3">{selectedDiary.title}</p>
              <p className="text-sm text-gray-700">{selectedDiary.content}</p>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => console.log("일기 작성 기능 추가 예정")}
                className="border border-black py-1 px-2 text-xs rounded-full active:scale-95 transition-transform duration-150 cursor-pointer"
              >
                + 감정 기록 작성하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiaryView;
