// @flow
import * as React from 'react';
import styled from '../../../styles/styled-components';

interface ILabelStyled {
  shrink?: boolean;
  className?: string;
}

interface IFieldLabelProps extends ILabelStyled {
  error: boolean;
  text: string;
  hasValue: boolean;
  focused: boolean;
}

// TODO: Fix the any type
const LabelStyled = styled.label<ILabelStyled>`
  top: 0;
  left: 0;
  position: absolute;
  line-height: 1;
  padding: 0;
  font: inherit;
  font-size: 1rem;
  transform-origin: top left;
  color: rgba(0, 0, 0, 0.54);
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  transform: translate(0, 1.5px) scale(0.75);
`;

const FieldLabel = ({
  error,
  hasValue,
  focused,
  text,
  shrink,
  className,
  ...other
}: IFieldLabelProps) => {
  const shrinkLabel = shrink || hasValue || focused;

  return (
    <LabelStyled shrink={shrinkLabel} className={className} {...other}>
      {text}
    </LabelStyled>
  );
};

export { FieldLabel, IFieldLabelProps };
