import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeProvider, useTheme } from './ThemeContext';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import ChatHistory from './ChatHistory';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    font-size: ${({ theme }) => theme.fontSize};
  }
`;

const lightTheme = {
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: '16px',
};

const darkTheme = {
  backgroundColor: '#121212',
  color: '#ffffff',
  fontSize: '16px',
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState([]);
  const currentSessionIndexRef = useRef(null);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
    setSessions(storedSessions);
  }, []);

  const addSession = (session) => {
    if (session.length > 0) {
      const newSessions = [...sessions, session];
      setSessions(newSessions);
      localStorage.setItem('chatSessions', JSON.stringify(newSessions));
    }
    currentSessionIndexRef.current = null;
    setCurrentSession([]);
  };

  // const updateSession = (messages) => {
  //   if (currentSessionIndexRef.current !== null) {
  //     const newSessions = sessions.map((session, index) =>
  //       index === currentSessionIndexRef.current ? messages : session
  //     );
  //     setSessions(newSessions);
  //     localStorage.setItem('chatSessions', JSON.stringify(newSessions));
  //   }
  // };

  const handleSessionClick = (session) => {
    const sessionIndex = sessions.indexOf(session);
    currentSessionIndexRef.current = sessionIndex;
    setCurrentSession(session);
  };

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar />
        <MainPanel addSession={addSession} currentSession={currentSession} 
        // updateSession={updateSession} 
        />
        <ChatHistory sessions={sessions} onSessionClick={handleSessionClick} />
      </AppContainer>
    </StyledThemeProvider>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
