// @flow
import styled from 'styled-components';

export const BackdropLight = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(255,255,255,0.75)'};
`;

export const BackdropDark = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(50,50,50,0.65)'};
`;
