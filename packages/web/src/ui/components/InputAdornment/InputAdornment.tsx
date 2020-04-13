import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

interface Props {
  children: any;
  className?: string;
  component?: any;
  disablePointerEvents?: boolean;
  disableTypography?: boolean;
  position: 'start' | 'end';
  variant?: string;
}

export const classes = {
  root: 'SSInputAdornment',
  positionStart: 'start',
  positionEnd: 'end',
};

const WrapStyled = styled.div`
  display: flex;
  max-height: 2em;
  align-items: center;

  &.start {
    margin-right: 8px;
  }

  &.end {
    margin-left: 8px;
  }
`;

const InputAdornment = React.forwardRef<Props, any>(function InputAdornment(
  props,
  ref
) {
  const {
    children,
    className,
    component: Component = 'div',
    // disablePointerEvents = false,
    // disableTypography = false,
    position,
    // variant: variantProp,
    ...rest
  } = props;

  // const ctxFormControl = useFormControlCtx() || {};

  // let variant = variantProp;

  return (
    <WrapStyled
      as={Component}
      ref={ref}
      className={clsx(className, classes.root, {
        [classes.positionStart]: position === 'start',
        [classes.positionEnd]: position === 'end',
      })}
      {...rest}
    >
      {typeof children === 'string' ? <span>{children}</span> : children}
    </WrapStyled>
  );
});

export default InputAdornment;
