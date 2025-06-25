import React, { useState } from 'react';
import dayjs from 'dayjs';
import events from '../data/events.json'; // import your static events
import isSameOrEqual from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrEqual);

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf('month').day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const getEventsForDate = (date) => {
    return events.filter((event) =>
      dayjs(event.date).isSame(date, 'day')
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
          ◀ Prev
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={nextMonth} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
          Next ▶
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-sm">
        {[...Array(startDay)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const date = currentDate.date(i + 1);
          const isToday = dayjs().isSame(date, 'day');
          const dayEvents = getEventsForDate(date);

          return (
            <div key={i} className="border p-2 rounded-lg h-24 overflow-hidden relative group bg-gray-50">
              <div className={`text-sm font-medium mb-1 ${isToday ? 'text-indigo-700' : 'text-gray-700'}`}>
                {i + 1}
              </div>
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="text-[10px] bg-indigo-200 text-indigo-800 rounded px-1 mb-1 truncate"
                  title={`${event.title} @ ${event.time}`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[10px] text-blue-500 absolute bottom-1 left-2">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
