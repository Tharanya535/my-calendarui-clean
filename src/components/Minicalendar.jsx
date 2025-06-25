import React, { useState } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

function Minicalendar({ currentDate, setCurrentDate, events }) {
  const [monthChangeDirection, setMonthChangeDirection] = useState(0);

  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const goToPreviousMonth = () => {
    setMonthChangeDirection(-1);
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setMonthChangeDirection(1);
    setCurrentDate(currentDate.add(1, "month"));
  };

  const [gotoDay, setGotoDay] = useState("");
  const [gotoMonth, setGotoMonth] = useState("");
  const [gotoYear, setGotoYear] = useState("");

  const handleGoto = () => {
    const newDate = dayjs(`${gotoYear}-${gotoMonth}-${gotoDay}`, "YYYY-MM-DD");
    if (newDate.isValid()) {
      setCurrentDate(newDate);
    } else {
      alert("Invalid date! Please enter a valid date.");
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-xs mx-auto sm:mx-0 bg-white rounded-3xl shadow-xl p-4 sm:p-5 text-gray-800 border-2 border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200"
        >
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-sm font-bold text-center">{currentDate.format("MMMM YYYY")}</h2>

        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200"
        >
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="truncate">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="min-h-[210px]">
        <AnimatePresence initial={false} custom={monthChangeDirection}>
          <motion.div
            key={currentDate.format("YYYY-MM")}
            custom={monthChangeDirection}
            initial={{ x: monthChangeDirection > 0 ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: monthChangeDirection > 0 ? -100 : 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 gap-1 text-center text-sm w-full"
          >
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {[...Array(daysInMonth)].map((_, i) => {
              const date = startOfMonth.date(i + 1);
              const isToday = date.isSame(today, "day");
              const isWeekend = date.day() === 0 || date.day() === 6;
              const isSelected = date.isSame(currentDate, "day");

              const eventsForDate = events.filter((event) =>
                dayjs(event.date).isSame(date, "day")
              );

              return (
                <div
                  key={i}
                  onClick={() => setCurrentDate(date)}
                  className={`p-2 rounded-lg cursor-pointer transition-all hover:scale-105 min-w-0 ${
                    isToday
                      ? "bg-indigo-600 text-white font-bold"
                      : isSelected
                      ? "bg-indigo-100 text-indigo-800 font-semibold"
                      : isWeekend
                      ? "text-red-400"
                      : "text-gray-700"
                  } hover:bg-indigo-100`}
                >
                  {i + 1}
                  <div className="flex justify-center mt-1 space-x-0.5">
                    {eventsForDate.slice(0, 3).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className="w-1.5 h-1.5 rounded-full bg-purple-500"
                      ></span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Go to Date */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Go to a date</h3>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full">
          <input
            type="number"
            placeholder="DD"
            className="w-full sm:w-16 px-2 py-1 border rounded text-sm"
            value={gotoDay}
            onChange={(e) => setGotoDay(e.target.value)}
          />
          <input
            type="number"
            placeholder="MM"
            className="w-full sm:w-16 px-2 py-1 border rounded text-sm"
            value={gotoMonth}
            onChange={(e) => setGotoMonth(e.target.value)}
          />
          <input
            type="number"
            placeholder="YYYY"
            className="w-full sm:w-24 px-2 py-1 border rounded text-sm"
            value={gotoYear}
            onChange={(e) => setGotoYear(e.target.value)}
          />
          <button
            onClick={handleGoto}
            className="w-full sm:w-auto bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default Minicalendar;
