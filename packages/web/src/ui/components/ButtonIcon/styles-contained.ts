import styled from 'styled-components';
import ButtonBase from '../ButtonBase';

export const ButtonBaseStyled = styled(ButtonBase)`
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  padding: 9px;
  overflow: visible;
`;

export const PrimaryContained = styled(ButtonBaseStyled)`
  color: var(--white);
  background-color: var(--greenTeal);

  &:hover {
    background-color: var(--greenTeal2);
  }

  &:active,
  &.active {
    background-color: var(--greenTeal3);
  }
`;

export const SecondaryContained = styled(ButtonBaseStyled)``;

export const DangerContained = styled(ButtonBaseStyled)``;
