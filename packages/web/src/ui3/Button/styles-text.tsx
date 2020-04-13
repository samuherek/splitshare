import styled from 'styled-components';
import ButtonBase from '../ButtonBase';

export const ButtonBaseStyled = styled(ButtonBase)`
  position: relative;
  font-weight: 500;
  letter-spacing: 0.8px;

  &:disabled,
  &.disabled {
    cursor: default;
    pointer-events: none;
  }
`;
