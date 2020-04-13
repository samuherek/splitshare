// @flow
import styled, { css } from 'styled-components';

export const TextBase = styled.p<{
  withEllipsis?: boolean;
  capitalize?: boolean;
}>`
  display: block;
  word-wrap: normal;
  font-weight: normal;
  line-height: 1.43;

  ${({ withEllipsis }) =>
    withEllipsis &&
    css`
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `};

  ${({ capitalize }) =>
    capitalize &&
    css`
      &:first-letter {
        text-transform: uppercase;
      }
    `};
`;

export const H1 = styled(TextBase)`
  font-size: 32px;
  letter-spacing: -0.4px;
  line-height: 1.31;
  font-weight: bold;
`;

export const H2 = styled(TextBase)`
  font-size: 23px;
  letter-spacing: 0.4px;
  font-weight: 500;
  line-height: 1.39;
`;

export const H3 = styled(TextBase)`
  font-size: 18px;
  letter-spacing: 0.6px;
  font-weight: 500;
  line-height: 1.33;
`;

export const H4 = styled(TextBase)`
  font-size: 16px;
  letter-spacing: 0.6px;
  font-weight: 500;
  line-height: 1.5;
`;

export const H5 = styled(TextBase)`
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 1.5;
`;

export const Paragraph = styled(TextBase)`
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.43;
`;

export const Subtitle = styled(TextBase)`
  font-size: 16px;
  letter-spacing: 0.6px;
  line-height: 1.5;
`;
