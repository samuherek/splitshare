import * as React from 'react';
import styled from '../../styles/styled-components';

interface IProps {
  children: React.ReactNode;
}

const WrapStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const TopBarLeft: React.FC<IProps> = ({ children }) => (
  <WrapStyled>{children}</WrapStyled>
);
