  import React,{ useState, useEffect} from 'react';
  import styled from 'styled-components';

  const ChatHistoryContainer = styled.div`
    width: 300px;
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 20px;
    border-left: 1px solid ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
  `;

  const ChatSessionItem = styled.li`
   cursor: pointer; 
   margin-bottom: 10px; 
   &:hover { background-color: ${({ theme }) => theme.color}; 
   color: ${({ theme }) => theme.backgroundColor}; 
   }
    `;

  const ChatHistory = ({ sessions = [], onSessionClick }) => {
      //const [chatHistory, setChatHistory] = useState([]);
    // Dummy data for chat history
    // const chatSessions = [
    //   'Cafe Table Tops options?',
    //   'Available table products?',
    //   // Add more dummy chat sessions
    // ];

    return (
      <ChatHistoryContainer> 
        <h3>Chat History</h3> 
        <ul> {sessions.map((session, index) => ( 
          <ChatSessionItem key={index} onClick={() => onSessionClick(session)}> 
          <strong>Session {index + 1}</strong> - {session[0]?.text.slice(0, 20)}... </ChatSessionItem> ))} 
        </ul> 
      </ChatHistoryContainer>
    );
  };

  export default ChatHistory;
