import { useState } from "react";
import Calendar from "react-calendar";
import "dayjs/locale/ko";
import "../Calendar/calendar.css";
import { formatDate, getToday } from "../../utils/date";
export interface MyCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  diaryDates: string[];
}

const MyCalendar = ({ selectedDate, onDateSelect, diaryDates }: MyCalendarProps) => {
  const [date, setDate] = useState<Date | null>(selectedDate || getToday());

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
              {diaryDates.includes(dateString) && (
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
