import React from 'react';
import styled from 'styled-components';
import ChatPanel from './ChatPanel';

const MainPanelContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background-color);
  padding: 20px;
  color: var(--text-color);
`;

const MainPanel = ({ addSession, currentSession, updateSession }) => {
  return (
    <MainPanelContainer>
      <ChatPanel addSession={addSession} initialMessages={currentSession} updateSession={updateSession}/>    
    </MainPanelContainer>
  );
};

export default MainPanel;
