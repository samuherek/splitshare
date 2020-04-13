import styled from 'styled-components';
import ButtonBase from '../../components/ButtonBase';

export const ButtonBaseStyled = styled(ButtonBase)`
  --primary-color: var(--black);
  position: relative;
  border-radius: 4px;
  padding: 8px 20px;
  font-weight: 500;
  letter-spacing: 0.8px;

  &:disabled,
  &.disabled {
    cursor: default;
    pointer-events: none;
  }
`;

export const PrimaryContained = styled(ButtonBaseStyled)`
  color: var(--primary-color);
  background-color: var(--primary-background);
  box-shadow: 0 0 0 1px var(--primary-color),
    0 2px 4px -1px var(--primaryColorShadow);

  &:hover,
  &.hover {
    color: var(--primary-color-hover);
    box-shadow: 0 0 0 1px var(--primary-color);
    background-color: var(--primary-background-hover);
  }

  &:active,
  &.active {
    color: var(--primary-color-active);
    box-shadow: 0 0 0 1px var(--primary-color);
    background-color: var(--primary-background-active);
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.33;
    color: var(--primary-color-disabled);
    box-shadow: 0 0 0 1px var(--primary-color);
    background-color: var(--primary-background-disabled);
  }
`;

// #ffffff
export const SecondaryContained = styled(ButtonBaseStyled)`
  color: var(--blueGrey);
  background-color: var(--white);
  box-shadow: 0 0 0 1px var(--paleLilac66);

  &:hover,
  &.hover {
    color: var(--greenTeal4);
    box-shadow: 0 0 0 1px var(--paleLilac);
  }

  &:active,
  &.active {
    box-shadow: 0 0 0 2px var(--greenTeal);
    color: var(--greenTeal4);
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &.disabled:active {
    opacity: 0.5;
    color: var(--blueGrey);
    box-shadow: 0 0 0 1px var(--paleLilac66);
    background-color: var(--white);
  }
`;

export const TertiaryContained = styled(ButtonBaseStyled)`
  color: var(--cloudyBlue);
  background-color: var(--paleLilac25);

  &:hover,
  &.hover {
    color: var(--blueGrey);
    background-color: var(--paleLilac40);
  }

  &:active,
  &.active {
    color: var(--blueGrey);
    background-color: var(--paleLilac50);
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.66;
    color: var(--cloudyBlue);
    background-color: var(--paleLilac25);
  }
`;

export const DarkContained = styled(ButtonBaseStyled)`
  color: var(--cloudyBlue);
  background-color: var(--darkGrey);

  &:hover,
  &.hover {
    color: var(--paleLilac);
    background-color: var(--paleLilac07);
  }

  &:active,
  &.active {
    color: var(--paleLilac);
    background-color: var(--paleLilac10);
  }

  &:disabled,
  &.disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled:hover,
  &:disabled:active {
    opacity: 0.66;
    color: var(--cloudyBlue);
    background-color: var(--darkGrey);
  }
`;
