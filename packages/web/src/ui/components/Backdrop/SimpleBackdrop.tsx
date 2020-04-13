import React from 'react';
import styled from 'styled-components';
import { BackdropProps } from './types.d';

const WrapStyled = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color-color: transparent;
`;

const SimpleBackdrop = React.forwardRef<unknown, BackdropProps>(
  function SimpleBackdrop(props, ref) {
    const { invisible = false, open, ...other } = props;

    return open ? (
      <WrapStyled
        aria-hidden={true}
        // FIXME: not sure how to type this
        // @ts-ignore
        ref={ref}
        style={invisible ? { backgroundColor: 'transparent' } : undefined}
        {...other}
      />
    ) : null;
  }
);

export default SimpleBackdrop;
