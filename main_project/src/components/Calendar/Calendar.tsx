import { useState } from "react";
import Calendar from "react-calendar";
import "dayjs/locale/ko";
import "../Calendar/calendar.css";
import { formatDate, getToday } from "../../utils/date";

export interface MyCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

const MyCalendar = ({ selectedDate, onDateSelect }: MyCalendarProps) => {
  const [date, setDate] = useState<Date | null>(selectedDate || getToday());

  const mockDiaryDates = [
    "2025-03-16",
    "2025-03-17",
    "2025-03-18",
    "2025-03-19",
    "2025-03-20",
    "2025-03-21",
    "2025-03-22",
    "2025-03-23",
    "2025-03-24",
    "2025-03-25",
    "2025-03-28",
    "2025-04-01",
    "2025-04-05",
    "2025-04-10",
    "2025-04-15",
    "2025-04-20",
  ];

  const handleDateChange = (newDate: Date | null) => {
    if (newDate instanceof Date) {
      if (date && formatDate(date) === formatDate(newDate)) {
        setDate(null);
        onDateSelect(null);
      } else {
        setDate(newDate);
        onDateSelect(newDate);
      }
    }
  };

  return (
    <div className="w-full h-[374px] overflow-hidden flex justify-center items-center">
      <Calendar
        onChange={(value) => value instanceof Date && handleDateChange(value)}
        value={date}
        locale="ko"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date }) => {
          const dateString = formatDate(date);
          return (
            <div style={{ position: "relative", textAlign: "center" }}>
              {mockDiaryDates.includes(dateString) && (
                <img
                  src="/checkIcon.png"
                  alt="음표아이콘"
                  className="absolute top-[-25px] right-[-2px] w-[15px] h-[15px]"
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyCalendar;
