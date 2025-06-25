import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [hovered, setHovered] = useState(false);
  const [rotated, setRotated] = useState(false);
  const themes = ["light", "dark", "purple", "teal"];

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => {
        setHovered(true);
        setRotated(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setRotated(false);
      }}
    >
      {/* Animated Image Button */}
      <motion.div
        animate={{ rotate: rotated ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-12 h-12 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md 
                   flex items-center justify-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/10910/10910295.png"
          alt="Theme Icon"
          className="w-7 h-7"
        />
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          >
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setHovered(false); // Close dropdown
                  setRotated(false); // Rotate back
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                  ${
                    theme === t
                      ? "font-bold text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
