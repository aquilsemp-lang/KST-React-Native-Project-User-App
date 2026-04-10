import React, { createContext, useContext, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    if (isDarkMode) {
      StatusBar.setBarStyle('light-content'); 
      StatusBar.setBackgroundColor('#000000'); 
    } else {
      StatusBar.setBarStyle('dark-content');  
      StatusBar.setBackgroundColor('#f2f2f2'); 
    }
  }, [isDarkMode]);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      background: '#000',
      text: '#fff',
      card: '#1a1a1a',
      border: 'gray',
      subText: '#999',
      icon: 'white',
    } : {
      background: '#f2f2f2',
      card: '#ffffff',
      text: '#000',
      subText: '#555',
      border: '#1a1a1a',
      icon: '#333',
    },
  };

  return (
    <themeContext.Provider value={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#f2f2f2'}
      />
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);