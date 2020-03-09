import anime from 'animejs';
import React from 'react';
import Transition from 'react-transition-group/Transition';

interface Props {
  children?: React.ReactNode;
  in: boolean;
  onEnter?: (node: HTMLElement) => void;
  onEntered?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  duration: number;
  onExited: (node: HTMLElement) => void;
  onEntering: (node: HTMLElement) => void;
}

const growIn = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: [0, 1],
    easing: 'easeOutQuad',
    scale: [0.5, 1],
    duration,
  });

const growOut = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: [node.style.opacity, 0],
    easing: 'easeInQuad',
    scale: [1, 0.5],
    duration,
  });

const Grow = React.forwardRef<Props, any>(function Grow(props, ref) {
  const {
    children,
    in: inProp,
    onEnter,
    onEntered,
    onExit,
    onExited,
    onEntering,
    duration = 75,
    ...rest
  } = props;

  const handleEnter = React.useCallback(
    node => {
      growIn(node, duration);
      if (onEnter) {
        onEnter(node);
      }
    },
    [onEnter, duration]
  );

  const handleExit = React.useCallback(
    node => {
      growOut(node, duration);
      if (onExit) {
        onExit(node);
      }
    },
    [onExit, duration]
  );

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExit={handleExit}
      onExited={onExited}
      onEntering={onEntering}
      timeout={duration}
      {...rest}
    >
      {children}
    </Transition>
  );
});

export default Grow;
