import styled from 'styled-components';
import ButtonBase from '../ButtonBase';

export const ButtonBaseStyled = styled(ButtonBase)`
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  padding: 9px;
  overflow: visible;
`;

export const ButtonLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// TODO: these button styles are not properly colorized yet
