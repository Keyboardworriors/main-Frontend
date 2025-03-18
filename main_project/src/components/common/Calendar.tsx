import { useState } from "react";
import Calendar from "react-calendar";
import "node_modules/react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [date, setDate] = useState(new Date());

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = () => {
    setDate(date);
  };

  return (
    <div>
      <Calendar locale="en" onChange={onChangeToday} value={date} />
    </div>
  );
};

export default MyCalendar;
