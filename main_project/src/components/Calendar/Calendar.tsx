import { useState } from "react";
import Calendar from "react-calendar";
import "../Calendar/calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const mockDiaryDates = [
    "2025-03-05",
    "2025-03-18",
    "2025-03-20",
    "2025-03-25",
    "2025-04-12",
    "2025-04-22",
  ];

  const onChangeToday = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="w-full h-[400px] overflow-hidden flex justify-center items-center">
      <Calendar
        locale="ko"
        onChange={onChangeToday}
        value={date}
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        className="h-full"
        tileContent={({ date }) => {
          // UTC 보정 적용
          const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
          const dateString = offsetDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환

          return (
            <div style={{ position: "relative", textAlign: "center" }}>
              {mockDiaryDates.includes(dateString) ? (
                <img
                  src="/checkIcon.png"
                  alt="음표아이콘"
                  className="absolute top-[-25px] right-[-2px] w-[15px] h-[15px]"
                />
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyCalendar;
