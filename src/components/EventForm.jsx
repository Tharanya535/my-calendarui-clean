import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function EventForm({ onClose, onAddEvent, defaultDateTime }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [color, setColor] = useState('blue');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const defaultDate = defaultDateTime ? dayjs(defaultDateTime) : dayjs();
    setDate(defaultDate.format('YYYY-MM-DD'));
    setTime(defaultDate.format('HH:mm'));
  }, [defaultDateTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    onAddEvent({
      title,
      date,
      time,
      color,
      description,
    });

    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-lg shadow-xl p-6 w-[350px] animate-fadeIn">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full border px-3 py-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <select
            className="w-full border px-3 py-2 rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
          </select>

          <textarea
            placeholder="Description (optional)"
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
