import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  useEffect(()=>{
        console.log(value.getDate(),value.getFullYear(),value.getDay());
  })

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
      <div>{value.getDate()}</div>
    </div>
  );
}