// @flow
import { Placement } from '@popperjs/core';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import Portal from '../../core/Portal';
import { createChainedFunction, getHasTransition } from '../../utils/helpers';
import { usePopper } from './usePopper';

type Props = {
  children: any;
  isOpen: boolean;
  container?: Object;
  anchorEl: any;
  className?: string;
  placement?: Placement;
  onClose?: () => void;
  popperProps?: Object;
  styles?: Object;
};

const classes = {
  root: 'Popper',
};

const WrapStyled = styled.div`
  z-index: 1;
`;

// TODO: We have removed the ref forwarding because we need to store it in
// state instead of ref. Let's implement forking of the ref here.
const Popper = React.forwardRef<Props, any>(function Popper(props, ref) {
  const {
    children,
    isOpen,
    onClose,
    container,
    anchorEl,
    className,
    placement: propPlacement = 'bottom',
    popperProps = {},
    ...rest
  } = props;

  const [tooltipRef, setTooltipRef] = React.useState(null);
  const [exited, setExited] = React.useState(!isOpen);
  const hasTransition = getHasTransition(props);

  // eslint-disable-next-line no-unused-vars
  // @ts-ignore
  const { styles, placement } = usePopper({
    ...popperProps,
    referenceNode: anchorEl,
    popperNode: tooltipRef,
    placement: propPlacement,
    open: isOpen,
  });

  React.useEffect(() => {
    // Using external click away helpers didn't seem to work well for this case.
    // because of that, we have a custom solution.
    // TODO: needs to be revisited to make sure it works as expected for all cases
    // and in case of refactor, make it better performing
    function handler(ev: any) {
      if (
        onClose &&
        tooltipRef &&
        // @ts-ignore
        !tooltipRef.contains(ev.target) &&
        !anchorEl.contains(ev.target)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [tooltipRef, anchorEl, onClose]);

  function handleEnter() {
    setExited(false);
  }

  function handleExited() {
    setExited(true);
  }

  if (!isOpen && (!hasTransition || exited)) {
    return null;
  }

  const childProps: any = {};

  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter);
    childProps.onExited = createChainedFunction(
      handleExited,
      children.props.onExited
    );
  }

  const combinedStyles = {
    ...popperProps.style,
    ...styles,
  };

  return (
    <Portal container={container}>
      <WrapStyled
        ref={setTooltipRef}
        role="tooltip"
        style={combinedStyles}
        className={clsx(className, classes.root)}
        // data-placement={propPlacement || placement}
        {...rest}
      >
        {React.cloneElement(children, childProps)}
      </WrapStyled>
    </Portal>
  );
});

export default Popper;
