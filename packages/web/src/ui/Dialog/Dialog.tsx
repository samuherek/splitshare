// @flow
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import Fade from '../Fade';
import Modal from '../Modal';
import { PaperDefault, PaperFullscreen } from './styles';

export type OnCloseFn = (ev: SyntheticEvent<any>, type: string) => void;

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: OnCloseFn;
  position?: 'top' | 'center';
  backdropProps?: object;
  onExited: () => void;
  duration?: number;
  paperProps?: object;
  className?: string;
  variant?: 'fullscreen' | 'default';
};

export const classes = {
  root: 'Dialog',
  fullscreen: 'fullscreen',
};

const DocumentDivStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  outline: none;
`;

const paperThemed = {
  dialog: PaperDefault,
  fullscreen: PaperFullscreen,
};

const Dialog = React.forwardRef<Props, any>((props, ref) => {
  const {
    isOpen = false,
    onClose,
    position = 'center',
    children,
    onExited,
    duration,
    backdropProps,
    className,
    paperProps = {},
    variant = 'dialog',
    ...rest
  } = props;

  // @ts-ignore
  const PaperComponent = paperThemed[variant] || PaperDefault;

  const handleBackdropClick = React.useCallback(
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

  const handleKeyDown = React.useCallback((ev: SyntheticEvent<HTMLElement>) => {
    // @ts-ignore
    if (ev.key === 'Escape') {
      ev.stopPropagation();
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      role="dialog"
      ref={ref}
      backdropProps={backdropProps}
      className={clsx(className, classes.root, {
        [classes.fullscreen]: variant === 'fullscreen',
      })}
      hideBackdrop={variant === 'fullscreen'}
      {...rest}
    >
      <Fade appear in={isOpen} onExited={onExited} duration={duration}>
        <DocumentDivStyled
          role="document"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          // onMouseDown={handleMouseDown}
          tabIndex={0}
          style={{
            alignItems: position === 'top' ? 'start' : 'center',
          }}
        >
          <PaperComponent {...paperProps}>{children}</PaperComponent>
        </DocumentDivStyled>
      </Fade>
    </Modal>
  );
});

export default Dialog;
