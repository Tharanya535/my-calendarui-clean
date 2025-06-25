import React, { useState } from 'react';
import dayjs from 'dayjs';
import Minicalendar from './Minicalendar';
import eventsData from '../events.json';
import EventForm from './EventForm';
import DailyTasks from './DailyTasks';
import ThemeSwitcher from './ThemeSwitcher';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState(eventsData);
  const [modalData, setModalData] = useState({ show: false, datetime: null });

  const startHour = 9;
  const endHour = 21;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  const weekStart = dayjs(selectedDate).startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setModalData({ show: false, datetime: null });
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)] font-sans transition-all duration-300">
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* Sidebar */}
      <aside className="w-1/4 bg-white dark:bg-gray-900 p-4 shadow-md rounded-r-3xl">
        <Minicalendar
          currentDate={selectedDate}
          setCurrentDate={(date) => setSelectedDate(dayjs(date))}
          events={events}
        />
        <DailyTasks selectedDate={selectedDate} events={events} />
      </aside>

      {/* Main Calendar */}
      <main className="w-3/4 p-4 overflow-hidden">
        {/* Header */}
        <div className="text-xl font-bold mb-4">
          <h1 className="text-gray-800 dark:text-white mb-1">TODAY</h1>
          <div className="text-4xl font-bold text-gray-700 dark:text-white">
            {selectedDate.format('D MMM YYYY')}
          </div>
        </div>

        {/* Day Headers with ADD EVENTS above Friday */}
        <div className="relative">
          {/* Add Events Button over Friday */}
          <button
            onClick={() =>
              setModalData({
                show: true,
                datetime: selectedDate
                  .hour(dayjs().hour())
                  .minute(0)
                  .second(0)
                  .toISOString(),
              })
            }
            className="absolute left-230 -top-19  px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow transition duration-300 z-40"
          >
            ADD EVENTS +
          </button>

          <div className="flex">
            <div className="w-[80px] shrink-0" />
            <div className="grid grid-cols-7 flex-1 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
              {weekDays.map((day, idx) => (
                <div
                  key={day.format("ddd D") + idx}
                  className="text-center font-medium py-2 border-l border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white"
                >
                  {day.format('ddd D')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex h-[calc(100vh-160px)] overflow-y-auto">
          {/* Time Column */}
          <div className="w-[80px] text-right pr-2 pt-6 shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[80px] text-xs text-gray-500 dark:text-gray-400 pr-2"
              >
                {dayjs().hour(hour).format('h A')}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 flex-1">
            {weekDays.map((day, colIdx) => (
              <div key={colIdx} className="border-l border-gray-200 dark:border-gray-700 relative">
                {hours.map((hour, rowIdx) => {
                  const blockTime = day.hour(hour).minute(0);
                  const blockEvents = events.filter(
                    (event) =>
                      dayjs(event.date).isSame(day, 'day') &&
                      event.time?.startsWith(String(hour).padStart(2, '0'))
                  );

                  return (
                    <div
                      key={rowIdx}
                      className="h-[80px] border-t border-gray-100 dark:border-gray-800 group relative px-1"
                    >
                      {/* Add Button */}
                      <button
                        onClick={() =>
                          setModalData({
                            show: true,
                            datetime: blockTime.toISOString(),
                          })
                        }
                        className="absolute top-1 right-1 text-purple-500 z-10 text-lg font-bold transition-transform duration-200 hover:scale-125 opacity-0 group-hover:opacity-100"
                      >
                        +
                      </button>

                      {/* Event List */}
                      <div className="absolute top-6 left-1 right-1 space-y-1 z-0">
                        {blockEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className="bg-purple-100 border-l-4 border-purple-500 rounded-md text-[11px] text-purple-900 px-2 py-1 shadow-sm hover:shadow-md truncate"
                          >
                            {event.title}
                          </div>
                        ))}

                        {/* Show +N if more than 2 */}
                        {blockEvents.length > 2 && (
                          <div className="relative group">
                            <div className="text-xs text-purple-600 cursor-pointer">
                              +{blockEvents.length - 2} more
                            </div>
                            <div className="hidden group-hover:flex flex-col absolute z-50 bg-white dark:bg-gray-900 text-xs border rounded shadow p-2 w-48 top-4">
                              {blockEvents.slice(2).map((event, idx) => (
                                <div key={idx} className="text-purple-900 dark:text-white border-b py-1">
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Event Modal */}
        {modalData.show && (
          <EventForm
            defaultDateTime={modalData.datetime}
            onClose={() => setModalData({ show: false, datetime: null })}
            onAddEvent={handleAddEvent}
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
