import * as React from 'react';
import styled from '../../styles/styled-components';

interface IProps {
  children: React.ReactNode;
}

const WrapStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
`;

export const LayoutTopBar: React.FC<IProps> = ({ children }) => (
  <WrapStyled>{children}</WrapStyled>
);
