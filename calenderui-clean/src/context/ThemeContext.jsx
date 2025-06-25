import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // default theme

  useEffect(() => {
    // Dynamically change CSS variables based on theme
    const root = document.documentElement;

    const themes = {
  light: {
    '--bg': '#f9fafb',
    '--text': '#1f2937', // dark text
  },
  dark: {
    '--bg': '#1f2937',
    '--text': '#ffffff', // ✅ white text for dark mode
  },
  purple: {
    '--bg': '#f5f3ff',
    '--text': '#6b21a8',
  },
  teal: {
    '--bg': '#f0fdfa',
    '--text': '#0f766e',
  },
};


    const current = themes[theme];
    if (current) {
      Object.entries(current).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
