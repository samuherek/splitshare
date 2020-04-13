// @flow
import anime from 'animejs';
import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from '../../core/utils/transitions';
import { useForkRef } from '../../utils/ref';

export interface GrowProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  children: any;
}

const rollIn = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: [0, 1],
    height: [0, node.offsetHeight],
    easing: 'easeOutQuad',
    // scale: [0.5, 1],
    begin: function(anim) {
      node.style.overflowY = 'hidden';
    },
    complete: function(anim) {
      node.style.overflowY = undefined;
    },
    duration,
  });

const rollOut = (node: any, duration: number) =>
  anime({
    targets: node,
    opacity: [node.style.opacity, 0],
    height: [node.style.height, 0],
    easing: 'easeInQuad',
    begin: function(anim) {
      node.style.overflowY = 'hidden';
    },
    // scale: [1, 0.5],
    duration,
  });

const Roll = React.forwardRef<unknown, GrowProps>((props, ref) => {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    onExited,
    onEntering,
    timeout = 175,
    ...rest
  } = props;

  // FIXME: not sure about typing
  // @ts-ignore
  const handleRef = useForkRef(children?.ref, ref);

  const handleEnter = React.useCallback(
    node => {
      const duration = typeof timeout === 'number' ? timeout : 300;
      rollIn(node, duration);
      if (onEnter) {
        onEnter(node, true);
      }
    },
    [onEnter, timeout]
  );

  const handleExit = React.useCallback(
    node => {
      const duration = typeof timeout === 'number' ? timeout : 300;
      rollOut(node, duration);
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

export default Roll;
