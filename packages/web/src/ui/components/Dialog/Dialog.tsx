// @flow
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import Fade from '../../transitions/Fade';
import Modal from '../Modal';
import Paper from '../Paper';

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
};

export const classes = {
  root: 'Dialog',
};

const PaperStyled = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 48px;
  position: relative;
  overflow-y: auto;
  flex: 0 1 auto;
  max-height: calc(100% - 96px);
  max-width: 600px;

  @media print {
    overflow-y: visible;
    box-shadow: none;
  }
`;

const DocumentDivStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  outline: none;
`;

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
    ...rest
  } = props;
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
      className={clsx(className, classes.root)}
      {...rest}
    >
      <Fade appear in={isOpen} onExited={onExited} timeout={duration}>
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
          <PaperStyled {...paperProps}>{children}</PaperStyled>
        </DocumentDivStyled>
      </Fade>
    </Modal>
  );
});

export default Dialog;
