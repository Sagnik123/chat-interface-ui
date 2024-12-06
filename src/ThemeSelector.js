import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>Select Theme</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
};

export default ThemeSelector;
