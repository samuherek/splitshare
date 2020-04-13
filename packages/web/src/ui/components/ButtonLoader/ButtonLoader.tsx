import capitalize from 'capitalize';
import clsx from 'clsx';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DarkContained,
  PrimaryContained,
  SecondaryContained,
  TertiaryContained,
} from './styles-contained';
import {
  DarkText,
  PrimaryText,
  SecondaryText,
  TertiaryText,
} from './styles-text';

interface Props {
  color?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  variant?: 'text' | 'contained';
}

export const classes = {
  root: 'ButtonLoader',
  primary: 'primary',
};

const stretch = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ButtonLoaderStyled = styled.span`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  i {
    animation-direction: alternate;
    animation-duration: 0.5s;
    animation-fill-mode: none;
    animation-iteration-count: infinite;
    animation-name: ${stretch};
    animation-play-state: running;
    animation-timing-function: ease-out;
    border-radius: 100%;
    display: block;
    height: 6px;
    width: 6px;
    margin: 0 3px;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.5s;
    }
  }
`;

const themedComponent = {
  primaryText: PrimaryText,
  primaryContained: PrimaryContained,
  secondaryText: SecondaryText,
  secondaryContained: SecondaryContained,
  tertiaryText: TertiaryText,
  tertiaryContained: TertiaryContained,
  darkText: DarkText,
  darkContained: DarkContained,
};

function ButtonLoader({ color = 'primary', variant = 'text' }: Props = {}) {
  const key = `${color}${capitalize(variant)}`;
  // @ts-ignore
  const ThemedComponent = themedComponent[key] || ButtonLoaderStyled;

  return (
    <ButtonLoaderStyled
      as={ThemedComponent}
      className={clsx(classes.root, {
        [classes.primary]: color === 'primary',
      })}
    >
      <i />
      <i />
      <i />
    </ButtonLoaderStyled>
  );
}

export default ButtonLoader;
