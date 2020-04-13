import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createChainedFunction, getHasTransition } from '../../utils/helpers';
import TrapFocus from '../../core/TrapFocus';
import Portal from '../../core/Portal';
import { useForkRef } from '../../utils/ref';
import { SimpleBackdrop } from '../Backdrop';
import { StandardProps } from '../types';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../../core/Portal';

export interface ModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  BackdropComponent?: React.ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  // manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  open: boolean;
}

function getPaddingRight(node: Element) {
  // FIXME: figure out the typing
  // @ts-ignore
  return parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;
}

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/3ffe3a5d82f6f561b82ff78d82b32a7d14aed558/js/src/modal.js#L512-L519
export function getScrollbarSize() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '99px';
  scrollDiv.style.height = '99px';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);
  const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarSize;
}

export function ownerWindow(node: Element) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(doc).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

function handleContainer(
  modal: HTMLElement,
  mountNode: HTMLElement,
  container: HTMLElement
) {
  const restoreStyle: {
    value: string;
    key: string;
    el: HTMLElement;
  }[] = [];
  const restorePaddings: string[] = [];
  let fixedNodes: NodeListOf<Element>[];

  if (isOverflowing(container)) {
    // Compute the size before applying overflow hidden to avoid any scroll jumps.
    const scrollbarSize = getScrollbarSize();

    restoreStyle.push({
      value: container.style.paddingRight,
      key: 'padding-right',
      el: container,
    });
    // Use computed style, here to get the real padding to add our scrollbar width.
    // FIXME: not idea how to type this
    // @ts-ignore
    container.style['padding-right'] = `${getPaddingRight(container) +
      scrollbarSize}px`;

    // .mui-fixed is a global helper.
    // TODO: change the class to something ours
    // FIXME: not idea how to type this
    // @ts-ignore
    fixedNodes = ownerDocument(container).querySelectorAll('.mui-fixed');
    [].forEach.call(fixedNodes, (node: HTMLElement) => {
      restorePaddings.push(node.style.paddingRight);
      node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
    });
  }

  // Improve Gatsby support
  // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
  const parent = container.parentElement!;
  const scrollContainer =
    parent.nodeName === 'HTML' &&
    // FIXME: not idea how to type this
    // @ts-ignore
    window.getComputedStyle(parent)['overflow-y'] === 'scroll'
      ? parent
      : container;

  // Block the scroll even if no scrollbar is visible to account for mobile keyboard
  // screensize shrink.
  restoreStyle.push({
    value: scrollContainer.style.overflow,
    key: 'overflow',
    el: scrollContainer,
  });
  scrollContainer.style.overflow = 'hidden';

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node: HTMLElement, i) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    restoreStyle.forEach(({ value, el, key }) => {
      if (value) {
        el.style.setProperty(key, value);
      } else {
        el.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getContainer(container: any): any {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container);
}

export function ownerDocument(node: any): any {
  return (node && node.ownerDocument) || document;
}
// };

const DivStyled = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1300;
  position: fixed;
`;

const Modal = React.forwardRef<unknown, ModalProps>((props, ref) => {
  const {
    children,
    open,
    container,
    hideBackdrop = false,
    disableEscapeKeyDown = false,
    onClose,
    BackdropProps,
    disableBackdropClick = false,
    BackdropComponent = SimpleBackdrop,
    ...rest
  } = props;

  const restore = React.useRef<() => void | void>();
  const modalRef = React.useRef<HTMLElement | null>(null);
  const mountNodeRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(modalRef, ref);

  const hasTransition = getHasTransition(props);
  const [exited, setExited] = React.useState(!open);

  const getDoc = () => ownerDocument(mountNodeRef.current);

  const handleOpen = React.useCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    restore.current = handleContainer(
      modalRef.current!,
      mountNodeRef.current!,
      resolvedContainer
    );

    if (modalRef.current) {
      // Fix a bug on Chrome where the scroll isn't initially 0.
      modalRef.current.scrollTop = 0;
    }
  }, [container]);

  const handleClose = React.useCallback(() => {
    if (restore.current) {
      restore.current();
    }
  }, []);

  const handleExited = React.useCallback(() => {
    setExited(true);
  }, [setExited]);

  const handleEnter = React.useCallback(() => {
    setExited(false);
  }, [setExited]);

  const handlePortalRef = React.useCallback(node => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    // Then it triggers open twice. Look into why
    // MUI is needing thisn and what is the difference.
    // if (open) {
    //   handleOpen();
    // }
  }, []);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleOpen, handleClose]);

  const handleBackdropClick = (event: any) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    // if (onBackdropClick) {
    //   onBackdropClick(event);
    // }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  // @ts-ignore
  const handleKeyDown = ev => {
    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (ev.key !== 'Escape') {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    ev.stopPropagation();

    // if (onEscapeKeyDown) {
    //   onEscapeKeyDown(event);
    // }

    if (!disableEscapeKeyDown && onClose) {
      onClose(ev, 'escapeKeyDown');
    }
  };

  if (!open && (!hasTransition || exited)) {
    return null;
  }

  const childProps: any = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = children.props.tabIndex || '-1';
  }

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
    <Portal ref={handlePortalRef} container={container}>
      <DivStyled
        onKeyDown={handleKeyDown}
        className="modal"
        // FIXME: no idea how to ref type it
        // @ts-ignore
        ref={handleRef}
        {...rest}
      >
        {hideBackdrop ? null : (
          <BackdropComponent
            open={open}
            // FIXME: why??
            // @ts-ignore
            onClick={handleBackdropClick}
            {...BackdropProps}
          />
        )}
        <TrapFocus
          // disableEnforceFocus={disableEnforceFocus}
          // disableAutoFocus={disableAutoFocus}
          // disableRestoreFocus={disableRestoreFocus}
          getDoc={getDoc}
          // isEnabled={true}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </TrapFocus>
      </DivStyled>
    </Portal>
  );
});

export default Modal;
