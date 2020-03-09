// @flow
import anime from "animejs";
import React from "react";
import Transition from "react-transition-group/Transition";

const fadeIn = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: {
      value: [0, 1],
      easing: "linear"
    },
    duration
  });

const fadeOut = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: {
      value: [1, 0],
      easing: "linear"
    },
    duration
  });

type Props = {
  children: React.ReactNode;
  in: boolean;
  onEnter?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  duration: number;
  onExited: (node: HTMLElement) => void;
  onEntering: (node: HTMLElement) => void;
};

const Fade = React.forwardRef<Props, any>((props, ref) => {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    onExited,
    onEntering,
    duration = 300,
    ...rest
  } = props;

  const handleEnter = React.useCallback(
    node => {
      fadeIn(node, duration);
      if (onEnter) {
        onEnter(node);
      }
    },
    [onEnter, duration]
  );

  const handleExit = React.useCallback(
    node => {
      fadeOut(node, duration);
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

export default Fade;
