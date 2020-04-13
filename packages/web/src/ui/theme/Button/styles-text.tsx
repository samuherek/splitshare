import styled from 'styled-components';
import ButtonBase from '../../components/ButtonBase';

const ButtonBaseStyled = styled(ButtonBase)`
  position: relative;
  font-weight: 500;
  letter-spacing: 0.8px;

  &:disabled,
  &.disabled {
    cursor: default;
    pointer-events: none;
  }
`;

// #0ec76a
export const PrimaryText = styled(ButtonBaseStyled)`
  &:hover,
  &.hover {
  }

  &:active,
  &.active {
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.33;
  }
`;

// #ffffff
export const SecondaryText = styled(ButtonBaseStyled)`
  &:hover,
  &.hover {
  }

  &:active,
  &.active {
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &.disabled:active {
    opacity: 0.5;
  }
`;

export const TertiaryText = styled(ButtonBaseStyled)`
  &:hover,
  &.hover {
  }

  &:active,
  &.active {
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.66;
  }
`;

export const DarkText = styled(ButtonBaseStyled)`
  &:hover,
  &.hover {
  }

  &:active,
  &.active {
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.66;
  }
`;
