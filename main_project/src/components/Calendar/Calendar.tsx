import { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "../Calendar/calendar.css";

export interface MyCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [date, setDate] = useState<Date | null>(selectedDate || new Date());

  const mockDiaryDates = [
    "2025-03-05",
    "2025-03-18",
    "2025-03-20",
    "2025-03-25",
    "2025-04-12",
    "2025-04-22",
  ];

  const onChangeToday = (newDate: Date | null) => {
    if (newDate instanceof Date) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  return (
    <div className="w-full h-[400px] overflow-hidden flex justify-center items-center">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onChangeToday(value);
          }
        }}
        value={date}
        locale="ko"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date }) => {
          const dateString = dayjs(date).format("YYYY-MM-DD");

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
