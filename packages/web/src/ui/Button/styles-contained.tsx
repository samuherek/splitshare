import styled from 'styled-components';
import ButtonBase from '../ButtonBase';

export const ButtonBaseStyled = styled(ButtonBase)`
  position: relative;
  border-radius: 4px;
  padding: 8px 20px;
  font-weight: 500;
  letter-spacing: 0.8px;

  border: 1px solid #eee;

  &:disabled,
  &.disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.5;
  }
`;
