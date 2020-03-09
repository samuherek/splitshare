import React from 'react';
import styled from 'styled-components';
import Backdrop from '../Backdrop';
import Portal from '../Portal';
import { createChainedFunction, getHasTransition } from '../utils/helpers';
import FocusTrap from './FocusTrap';

type Props = {
  children: any; // TODO: This needs to have a correct type
  isOpen: boolean;
  hideBackdrop?: boolean;
  onClick?: () => void;
  onClose?: (...args: any) => void; // TODO: Needs to establish API args for the function
  backdropProps?: object;
};

const DialogDivStyled = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1300;
  position: fixed;
`;

const Modal = (props: Props) => {
  const {
    children,
    isOpen,
    hideBackdrop = false,
    onClose,
    backdropProps,
    ...rest
  } = props;
  const hasTransition = getHasTransition(props);
  const [exited, setExited] = React.useState(!isOpen);

  const handleExited = React.useCallback(() => {
    setExited(true);
  }, [setExited]);

  const handleEnter = React.useCallback(() => {
    setExited(false);
  }, [setExited]);

  React.useLayoutEffect(() => {
    if (!exited) {
      // FIXME: How the hell to type the body element...
      // $FlowFixMe
      document.body.style.overflow = 'hidden';
    } else {
      // @ts-ignore
      document.body.style.overflow = null;
    }
  }, [exited]);

  const handleBackdropClick = React.useCallback(
    // @ts-ignore
    (ev: SyntheticEvent<HTMLElement>) => {
      if (ev.target !== ev.currentTarget) {
        return;
      }

      if (onClose) {
        onClose(ev, 'backdropClick');
      }
    },
    [onClose]
  );

  // @ts-ignore
  const handleKeyDown = (ev: SyntheticEvent<HTMLElement>) => {
    // FIXME: What the hell is the correct event type here
    // $FlowFixMe
    if (ev.key === 'Escape') {
      ev.stopPropagation();
    }
  };

  if (!isOpen && (!hasTransition || exited)) {
    return null;
  }

  const childProps = {};

  if (hasTransition) {
    // @ts-ignore
    childProps.onEnter = createChainedFunction(
      handleEnter
      // children.props.onEnter
    );
    // TODO: Add a chained function to handle exited even on "ESC" or backdrop click
    // @ts-ignore
    childProps.onExited = createChainedFunction(
      handleExited,
      children.props.onExited
    );
  }

  return (
    <Portal>
      <DialogDivStyled className="dialog" onKeyDown={handleKeyDown} {...rest}>
        {hideBackdrop ? null : (
          <Backdrop
            onClick={handleBackdropClick}
            isOpen={isOpen}
            duration={175}
            {...backdropProps}
          />
        )}
        <FocusTrap>{React.cloneElement(children, childProps)}</FocusTrap>
      </DialogDivStyled>
    </Portal>
  );
};

export default Modal;
