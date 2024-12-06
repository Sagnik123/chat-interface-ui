import React, { useState } from 'react';
import styled from 'styled-components';

const InputPanelContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: #f4f4f9;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
`;

const Textarea = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  margin-right: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const InputPanel = ({ onNewMessage, onNewChat }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onNewMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <InputPanelContainer>
      <Textarea 
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <Button onClick={handleSubmit}>Send</Button>
    </InputPanelContainer>
  );
};

export default InputPanel;
