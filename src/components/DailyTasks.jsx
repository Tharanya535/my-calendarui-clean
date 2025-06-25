import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import giftLottie from "../assets/giftLottie.json";

function DailyTasks({ selectedDate, events }) {
  const [checkedTasks, setCheckedTasks] = useState({});
  const [showLottie, setShowLottie] = useState(false);
  const timeoutRef = useRef(null);

  const dateStr = selectedDate.format("YYYY-MM-DD");
  const todaysEvents = events.filter(event => event.date === dateStr);
  const allChecked = todaysEvents.length > 0 && todaysEvents.every(e => checkedTasks[e.title]);

  useEffect(() => {
    if (allChecked) {
      setShowLottie(true);
      timeoutRef.current = setTimeout(() => {
        setShowLottie(false);
      }, 3000);
    } else {
      clearTimeout(timeoutRef.current);
      setShowLottie(false);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [allChecked, todaysEvents]);

  const toggleCheck = (title) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  if (todaysEvents.length === 0) return null;

  return (
    <div className="relative bg-white mt-6 p-4 rounded-xl shadow-md border-2 border-gray-200 overflow-hidden w-[320px]">
      
      {/* Title Row with Emoji/Lottie */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-700">
          Tasks on {selectedDate.format("DD MMM YYYY")}
        </h3>

        <div className="absolute top-2 right-2 w-[64px] h-[64px]">
  {/* Lottie animation (shown when allChecked) */}
  <div
    className={`absolute inset-0 transition-opacity duration-700 ${showLottie ? "opacity-100" : "opacity-0"}`}
  >
    <Lottie animationData={giftLottie} loop={false} />
  </div>

  {/* Emoji (shown when not allChecked) */}
  <div
    className={`absolute inset-0 flex items-center justify-center text-3xl transition-opacity duration-700 ${showLottie ? "opacity-0" : "opacity-100"}`}
  >
    ☀️
  </div>
</div>

      </div>

      {/* Checklist */}
      <ul className="mt-2 space-y-2">
        {todaysEvents.map((event, idx) => (
          <li key={idx} className="flex items-center">
            <input
              type="checkbox"
              checked={!!checkedTasks[event.title]}
              onChange={() => toggleCheck(event.title)}
              className="mr-2 cursor-pointer"
            />
            <span>{event.title}</span>
          </li>
        ))}
      </ul>

      {/* Hurray Message */}
      {allChecked && (
        <div className="mt-3 text-center text-sm text-purple-600 font-medium animate-pulse">
          🎉 HURRAY! ALL TASKS DONE 🎉
        </div>
      )}
    </div>
  );
}

export default DailyTasks;
