import { useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isToday,
  subYears,
  addYears,
} from 'date-fns';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const startDay = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDay, i));

  const prevYear = () => setCurrentDate(subYears(currentDate, 1));
  const nextYear = () => setCurrentDate(addYears(currentDate, 1));

  return (
    <div className="p-6 rounded-lg bg-white text-center max-w-[372px]">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevYear} className="p-2 hover:bg-gray-200 rounded">
          <ArrowBackIosIcon fontSize="small" />
        </button>
        <span className="font-bold text-sm">
          {`${format(currentDate, 'MMM')} ${format(currentDate, 'yyyy')}`}
        </span>
        <button onClick={nextYear} className="p-2 hover:bg-gray-200 rounded">
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </div>

      {/* Days and Dates Row */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col items-center p-2 rounded-lg">
            <span className="text-sm font-semibold text-gray-700">
              {daysOfWeek[index]}
            </span>
            <span
              className={`text-lg font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center ${
                isToday(day)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {format(day, 'd')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
