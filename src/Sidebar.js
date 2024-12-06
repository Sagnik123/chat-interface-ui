import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';

const SidebarContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  border-right: 1px solid ${({ theme }) => theme.color};
`;

const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.backgroundColor};
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color === '#000' ? '#333' : '#bbb'};
  }
`;

const Sidebar = () => {
  const { toggleTheme } = useTheme();

  return (
    <SidebarContainer>
      {/* Other Sidebar content */}
      <ToggleButton onClick={toggleTheme}>
        Toggle Theme
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
