import * as React from 'react';
import styled, { keyframes } from '../../styles/styled-components';

// @flow

interface IProps {
  shape?: 'circle' | 'round' | 'sharp';
}

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(200%);
  }
`;

const LoadingWrapStyled = styled('div')<IProps>`
  display: block;
  overflow: hidden;
  position: relative;
  background: #e5eaec;
  width: 100%;
  height: 10px;
  border-radius: ${({ shape = 'round' }) => {
    if (shape === 'circle') return '1000px';
    if (shape === 'round') return '3px';
    if (shape === 'sharp') return '0';
    return '';
  }};

  &:after {
    content: '';
    position: absolute;
    animation: ${loadingAnimation} 1s linear infinite;
    background: linear-gradient(
      to right,
      rgba(15, 15, 15, 0) 0%,
      rgba(219, 219, 219, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000f0f0f', endColorstr='#00ffffff',GradientType=1 );
    display: block;
    height: inherit;
    left: 0;
    top: 0;
    width: 150%;
    will-change: transform;
  }
`;

export const LoadingPlaceholder: React.FC<IProps> = props => (
  <LoadingWrapStyled {...props} />
);
