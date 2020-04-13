import cx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import {
  default as FieldsetCore,
  FieldsetProps as FieldsetCoreProps,
} from '../../core/Fieldset';

export interface FieldsetProps extends FieldsetCoreProps {}

export const classes = {
  root: 'Fieldset',
};

const FieldsetStyled = styled(FieldsetCore)`
  border: none;

  &.disabled,
  &:disabled {
    opacity: 0.5;
  }
`;

function Fieldset({ className, ...rest }: FieldsetProps) {
  // @ts-ignore
  return <FieldsetStyled className={cx(className, classes.root)} {...rest} />;
}

export default Fieldset;
