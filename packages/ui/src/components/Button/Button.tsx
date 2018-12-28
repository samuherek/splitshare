import * as React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  background: ${({ theme }) => theme.colors.primary};
`;

export const Button = () => <ButtonStyled>button</ButtonStyled>;
