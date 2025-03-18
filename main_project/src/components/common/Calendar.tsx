import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [today, setToday] = useState(new Date()); 

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = () => {
    setToday(today);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-xl font-semibold text-center mb-4">My Calendar</h2>
        <div className="react-calendar-container">
          <Calendar
            locale="en"
            onChange={onChangeToday}
            value={today}
            className="max-w-full border-none mb-4 p-5"
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;