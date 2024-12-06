import React from 'react';
import styled from 'styled-components';

const FollowUpContainer = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.color};
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color};
`;

const FollowUpPanel = ({ followUpQuestion }) => {
  return (
    <FollowUpContainer>
      {followUpQuestion ? `Follow-up question: ${followUpQuestion}` : 'No follow-up question available.'}
    </FollowUpContainer>
  );
};

export default FollowUpPanel;
