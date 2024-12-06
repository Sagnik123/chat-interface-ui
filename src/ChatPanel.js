import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUser, FaRobot } from 'react-icons/fa';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &.user {
    justify-content: flex-end;
  }

  &.agent {
    justify-content: flex-start;
  }

  strong {
    margin-right: 5px;
  }
`;

const MessageForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NewChatButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ChatPanel = ({ addSession, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [pdfUrl, setPdfUrl] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    } else {
      const storedMessages = JSON.parse(localStorage.getItem('currentChat')) || [];
      setMessages(storedMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('currentChat', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = window.socket;

    if (socket) {
      socket.on('bot_uttered', async (response) => {
        console.log('Bot uttered:', response);
        if (response.text) {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const matchedURLs = response.text.match(urlRegex);
          if (matchedURLs) {
            const cleanURL = matchedURLs[0].replace(/["']$/, '');
            setMessages((prevMessages) => [...prevMessages, { sender: 'Agent', text: response.text, link: cleanURL }]);
          } else {
            setMessages((prevMessages) => [...prevMessages, { sender: 'Agent', text: response.text }]);
          }
        }
        if (response.attachment) {
          setMessages((prevMessages) => [...prevMessages, { sender: 'Agent', text: `<img src="${response.attachment.payload.src}" alt="Attachment" />` }]);
        }
        if (response.quick_replies) {
          setMessages((prevMessages) => [...prevMessages, { sender: 'Agent', text: response.quick_replies.map(qr => qr.title).join(', ') }]);
        }
      });

      return () => {
        socket.off('bot_uttered');
      };
    } else {
      console.error('Socket is not defined');
    }
  }, []);

  const handleNewMessage = (newMessage) => {
    if (newMessage.trim() !== '') {
      const userMessage = { sender: 'User', text: newMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (window.socket) {
        console.log('Emitting user message:', newMessage);
        window.socket.emit('user_uttered', { message: newMessage });
      } else {
        console.error('Socket or sessionId is not defined');
      }
    }
  };

  const startNewChat = () => {
    addSession(messages);
    setMessages([]);
    localStorage.removeItem('currentChat');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      // Add the PDF as a message in the chat
      setMessages((prevMessages) => [...prevMessages, { sender: 'User', text: 'Uploaded a PDF file.', pdfUrl: fileUrl }]);
    }
  };

  return (
    <ChatContainer>
      <Header>
        <p>Chat with Rasa chatbot</p>
      </Header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} className={msg.sender.toLowerCase()}>
            {msg.sender === 'User' ? <FaUser /> : <FaRobot />}
            <div>
              <strong>{msg.sender}:</strong>
              <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
              {msg?.link && <LinkPreview url={msg.link} />}
              {msg?.pdfUrl && (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                  <Document file={msg.pdfUrl}>
                    <Page pageNumber={1} />
                  </Document>
                </div>
              )}
            </div>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <MessageForm onSubmit={(e) => {
        e.preventDefault();
        const messageInput = document.getElementById('message-input');
        const newMessage = messageInput.value;
        handleNewMessage(newMessage);
        messageInput.value = '';
      }}>
        <MessageInput id="message-input" autoComplete="off" autoFocus />
        <SendButton type="submit">Send</SendButton>
        <NewChatButton type="button" onClick={startNewChat}>Start New Chat</NewChatButton>
      </MessageForm>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    </ChatContainer>
  );
};

export default ChatPanel;
