import dayjs from "dayjs";
import { Diary } from "../models/type";
import { Mood } from "../models/type";

const mockDiaryDates: Diary[] = [
  {
    diary_id: 1,
    date: "2025-03-05",
    title: "행복한 날",
    content:
      "오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! 오늘은 정말 행복한 하루였다! ",
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
  const formatDate = (date: Date): string => {
    return dayjs(date).startOf("day").format("YYYY-MM-DD");
  };

  const selectedDiary = mockDiaryDates.find(
    (diary) => diary.date === (selectedDate ? formatDate(selectedDate) : ""),
  );

  return (
    <div className="p-4 bg-transparent h-80">
      {selectedDate && (
        <div>
          {selectedDiary ? (
            <div className="max-w-md mx-auto">
              {/* 썸네일 이미지 */}
              <img
                src={selectedDiary.rec_music.thumbnail}
                alt="추천 음악"
                className="w-18 h-18 object-cover rounded-full mx-auto mb-3 border border-gray-300"
              />
              <p className="text-center text-s font-semibold text-gray-700">
                {selectedDiary.rec_music.title}
              </p>
              <p className="text-center text-xs text-gray-700 mb-3">
                {selectedDiary.rec_music.artist}
              </p>
              <p className="text-xs text-gray-500 mb-3 text-right">
                {selectedDiary.date} | {selectedDiary.mood}
              </p>
              <p className="text-s font-semibold mb-3">{selectedDiary.title}</p>
              <p className="text-xs text-gray-700 mb-3">{selectedDiary.content}</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto flex items-center justify-center">
              <button
                onClick={() => console.log("일기 작성 기능 추가 예정")}
                className="border border-black py-1 px-2 text-xs rounded-full active:scale-98 transition-all duration-200 cursor-pointer"
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
