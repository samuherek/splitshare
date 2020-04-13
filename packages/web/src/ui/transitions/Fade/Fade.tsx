// @flow
import anime from 'animejs';
import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from '../../core/utils/transitions';
import { useForkRef } from '../../utils/ref';

export interface FadeProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  children: any;
}

const fadeIn = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: {
      value: [0, 1],
      easing: 'linear',
    },
    duration,
  });

const fadeOut = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: {
      value: [1, 0],
      easing: 'linear',
    },
    duration,
  });

const Fade = React.forwardRef<unknown, FadeProps>((props, ref) => {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    onExited,
    onEntering,
    timeout = 300,
    ...rest
  } = props;

  // FIXME: not sure about typing
  // @ts-ignore
  const handleRef = useForkRef(children?.ref, ref);

  const handleEnter = React.useCallback(
    node => {
      const duration = typeof timeout === 'number' ? timeout : 300;
      fadeIn(node, duration);
      if (onEnter) {
        onEnter(node, true);
      }
    },
    [onEnter, timeout]
  );

  const handleExit = React.useCallback(
    node => {
      const duration = typeof timeout === 'number' ? timeout : 300;
      fadeOut(node, duration);
      if (onExit) {
        onExit(node);
      }
    },
    [onExit, timeout]
  );

  return (
    // FIXME: not sure about typing
    // @ts-ignore
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      onExited={onExited}
      onEntering={onEntering}
      timeout={timeout}
      {...rest}
    >
      {(_: any, childProps: any) => {
        return React.cloneElement(children, { ref: handleRef, ...childProps });
      }}
    </Transition>
  );
});

export default Fade;
