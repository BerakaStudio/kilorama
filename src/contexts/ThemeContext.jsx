import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('small');

  useEffect(() => {
    // Cargar configuración guardada
    const savedTheme = localStorage.getItem('kilorama-theme') || 'light';
    const savedFontSize = localStorage.getItem('kilorama-font-size') || 'small';
    
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const applyFontSize = (size) => {
    document.documentElement.setAttribute('data-font-size', size);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('kilorama-theme', newTheme);
    applyTheme(newTheme);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    localStorage.setItem('kilorama-font-size', size);
    applyFontSize(size);
  };

  return (
    <ThemeContext.Provider value={{ theme, fontSize, toggleTheme, changeFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};