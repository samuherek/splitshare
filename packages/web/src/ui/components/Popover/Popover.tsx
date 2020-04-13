import React from 'react';
import Modal from '../Modal';
import Roll from '../../transitions/Roll';
import styled from 'styled-components';
import { StandardProps } from '../types';
import { ModalProps } from '../Modal/Modal';
import {
  TransitionHandlerProps,
  TransitionProps,
} from '../../core/utils/transitions';
import { PaperProps } from '../Paper';

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

export interface PopoverActions {
  updatePosition(): void;
}

export interface PopoverProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>> {
  action?: React.Ref<PopoverActions>;
  anchorEl?: null | Element | ((element: Element) => Element);
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  anchorReference?: PopoverReference;
  children?: React.ReactNode;
  elevation?: number;
  getContentAnchorEl?: null | ((element: Element) => Element);
  marginThreshold?: number;
  modal?: boolean;
  PaperProps?: Partial<PaperProps>;
  role?: string;
  transformOrigin?: PopoverOrigin;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  TransitionProps?: TransitionProps;
}

const DivStyled = styled.div`
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  /* // So we see the popover when it's empty.
    // It's most likely on issue on userland. */
  min-width: 16px;
  min-height: 16;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  /* // We disable the focus ring for mouse, touch and keyboard users. */
  outline: 0;
  background: white;
  box-shadow: 0 1px 10px 3px rgba(100, 100, 100, 0.1);
`;

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export function debounce(func: () => void, wait = 166) {
  let timeout: number;
  function debounced(...args: []) {
    // eslint-disable-next-line consistent-this
    // FIXME: no idea how to type this
    // @ts-ignore
    const that = this;
    const later = () => {
      func.apply(that, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

export function ownerDocument(node: Element | HTMLElement) {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow(node: Element | HTMLElement) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

export function getOffsetTop(
  rect: {
    width: number;
    height: number;
  },
  vertical: number | 'center' | 'bottom' | 'top'
) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

export function getOffsetLeft(
  rect: {
    width: number;
    height: number;
  },
  horizontal: number | 'center' | 'left' | 'right'
) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin: {
  vertical: any;
  horizontal: number;
}) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent: HTMLElement, child: HTMLElement) {
  let element: HTMLElement | null = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += element?.scrollTop ?? scrollTop;
  }
  return scrollTop;
}

function getAnchorEl(anchorEl: any) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const Popover = React.forwardRef<unknown, PopoverProps>((props, ref) => {
  const {
    children,
    // FIXME: why??
    // @ts-ignore
    open,
    anchorEl,
    TransitionComponent = Roll,
    // FIXME: why??
    // @ts-ignore
    container: containerProp,
    TransitionProps = {},
    anchorPosition,
    getContentAnchorEl,
    marginThreshold = 16,
    anchorReference = 'anchorEl',
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    ...other
  } = props;

  const paperRef = React.useRef<HTMLElement | null>(null);

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  const getTransformOrigin = React.useCallback(
    (
      elemRect: {
        width: number;
        height: number;
      },
      contentAnchorOffset = 0
    ) => {
      return {
        vertical:
          getOffsetTop(elemRect, transformOrigin.vertical) +
          contentAnchorOffset,
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical]
  );

  // const handlePaperRef = React.useCallback(instance => {
  //   // #StrictMode ready
  //   paperRef.current = ReactDOM.findDOMNode(instance);
  // }, []);

  // Returns the vertical offset of inner content to anchor the transform on if provided
  const getContentAnchorOffset = React.useCallback(
    (element: HTMLElement) => {
      let contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        const contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && element.contains(contentAnchorEl)) {
          // FIXME: figure out the typing
          // @ts-ignore
          const scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset =
            // @ts-ignore
            contentAnchorEl.offsetTop +
              contentAnchorEl.clientHeight / 2 -
              scrollTop || 0;
        }

        // != the default value
        if (process.env.NODE_ENV !== 'production') {
          if (anchorOrigin.vertical !== 'top') {
            console.error(
              [
                'Material-UI: you can not change the default `anchorOrigin.vertical` value ',
                'when also providing the `getContentAnchorEl` prop to the popover component.',
                'Only use one of the two props.',
                'Set `getContentAnchorEl` to `null | undefined`' +
                  ' or leave `anchorOrigin.vertical` unchanged.',
              ].join('\n')
            );
          }
        }
      }

      return contentAnchorOffset;
    },
    [anchorOrigin.vertical, anchorReference, getContentAnchorEl]
  );

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = React.useCallback(
    contentAnchorOffset => {
      if (anchorReference === 'anchorPosition') {
        if (process.env.NODE_ENV !== 'production') {
          if (!anchorPosition) {
            console.error(
              'Material-UI: you need to provide a `anchorPosition` prop when using ' +
                '<Popover anchorReference="anchorPosition" />.'
            );
          }
        }
        return anchorPosition;
      }

      const resolvedAnchorEl = getAnchorEl(anchorEl);
      const containerWindow = ownerWindow(resolvedAnchorEl);

      // If an anchor element wasn't provided, just use the parent body element of this Popover
      const anchorElement =
        // FIXME: figure out the typing
        // @ts-ignore
        resolvedAnchorEl instanceof containerWindow.Element
          ? resolvedAnchorEl
          : // FIXME: figure out the typing
            // @ts-ignore
            ownerDocument(paperRef.current).body;
      const anchorRect = anchorElement.getBoundingClientRect();

      if (process.env.NODE_ENV !== 'production') {
        const box = anchorElement.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          console.warn(
            [
              'Material-UI: the `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n')
          );
        }
      }

      const anchorVertical =
        contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
        left:
          anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      };
    },
    [
      anchorEl,
      anchorOrigin.horizontal,
      anchorOrigin.vertical,
      anchorPosition,
      anchorReference,
    ]
  );

  const getPositioningStyle = React.useCallback(
    (element: HTMLElement) => {
      // Check if the parent has requested anchoring on an inner content node
      const contentAnchorOffset = getContentAnchorOffset(element);
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(
        elemRect,
        contentAnchorOffset
      );

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      // Get the offset of of the anchoring element
      const anchorOffset = getAnchorOffset(contentAnchorOffset);

      // Calculate element positioning
      let top = anchorOffset?.top - elemTransformOrigin.vertical;
      let left = anchorOffset?.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      const containerWindow = ownerWindow(getAnchorEl(anchorEl));

      // Window thresholds taking required margin into account
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (
          elemRect.height > heightThreshold &&
          elemRect.height &&
          heightThreshold
        ) {
          console.error(
            [
              'Material-UI: the popover component is too tall.',
              `Some part of it can not be seen on the screen (${elemRect.height -
                heightThreshold}px).`,
              'Please consider adding a `max-height` to improve the user-experience.',
            ].join('\n')
          );
        }
      }

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [
      anchorEl,
      anchorReference,
      getAnchorOffset,
      getContentAnchorOffset,
      getTransformOrigin,
      marginThreshold,
    ]
  );

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  const handleEntering = (element: HTMLElement, isAppearing: boolean) => {
    // if (onEntering) {
    //   onEntering(element, isAppearing);
    // }

    setPositioningStyles();
  };

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleResize = debounce(() => {
      setPositioningStyles();
    });

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('rezise', handleResize);
    };
  }, [open, setPositioningStyles]);

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container =
    containerProp ||
    (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

  return (
    <Modal
      container={container}
      open={open}
      ref={ref}
      BackdropProps={{ invisible: true }}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        timeout={200}
        {...TransitionProps}
        onEntering={handleEntering}
      >
        <DivStyled
          // FIXME: figure out the typing
          // @ts-ignore
          ref={paperRef}
        >
          {children}
        </DivStyled>
      </TransitionComponent>
    </Modal>
  );
});

export default Popover;
