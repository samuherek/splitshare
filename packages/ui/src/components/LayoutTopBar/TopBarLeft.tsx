import * as React from 'react';
import styled from '../../styles/styled-components';

interface IProps {
  children: React.ReactNode;
}

const WrapStyled = styled.div``;

export const TopBarLeft: React.FC<IProps> = ({ children }) => (
  <WrapStyled>{children}</WrapStyled>
);
