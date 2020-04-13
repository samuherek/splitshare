// @flow
import { createPopper, Instance, Modifier, Placement } from '@popperjs/core';
import React from 'react';
import { useDiffedState } from './useDiffedState';

export interface PopperProps {
  referenceNode?: HTMLElement;
  popperNode?: HTMLElement | null;
  arrowNode?: HTMLElement;
  placement?: Placement;
  eventsEnabled?: boolean;
  enableScheduleUpdate?: boolean;
  positionFixed?: boolean;
  modifiers?: Partial<Modifier<any>>[];
  open?: boolean;
}

export type PopperState = {
  styles: Object;
  arrowStyles: Object;
  hide: boolean;
  placement: Placement;
};

const initialMod: Partial<Modifier<any>>[] = [];

function from3dTo2d(string: string) {
  const [x, y] = string.split('(')[1].split(', ');
  return `translate(${x}, ${y})`;
}

// Comment: We need to remove the `willChange` and transform the  `translate3d(x,y,z)`
// otherwise it causes the bug with google chrome where the item is blured
function removeAcceleration({ transform, willChange, ...styles }: any) {
  return {
    ...styles,
    transform: from3dTo2d(transform),
  };
}

function usePopperState(placement: Placement) {
  const [currentStyles, setStyles] = useDiffedState({
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
  });
  const [currentOutOfBoundaries, setOutOfBoundaries] = React.useState(false);
  const [currentPlacement, setPlacement] = React.useState(placement);
  const [currentArrowStyles, setArrowStyles] = useDiffedState({});

  function updatePopperState(updatedData: PopperState) {
    const {
      styles,
      arrowStyles,
      hide,
      placement: updatedPlacement,
    } = updatedData;
    setStyles(removeAcceleration(styles));
    setOutOfBoundaries(hide);
    setPlacement(updatedPlacement);
    setArrowStyles(arrowStyles);
  }

  const popperStyles = {
    styles: currentStyles,
    placement: currentPlacement,
    outOfBoundaries: currentOutOfBoundaries,
    arrowStyles: currentArrowStyles,
  };

  return [popperStyles, updatePopperState];
}

function usePopper({
  referenceNode,
  popperNode,
  arrowNode,
  placement = 'bottom',
  eventsEnabled = true,
  positionFixed = false,
  enableScheduleUpdate = false,
  modifiers = initialMod,
  open = true,
}: PopperProps) {
  const popperInstance = React.useRef<Instance | null>(null);
  const [popperStyles, updatePopperState] = usePopperState(placement);

  React.useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }

    if (!referenceNode || !popperNode || !open) {
      return;
    }

    popperInstance.current = createPopper(referenceNode, popperNode, {
      placement,
      positionFixed,
      modifiers: [
        {
          name: 'eventListeners',
          options: {
            scroll: eventsEnabled,
            resize: eventsEnabled,
          },
        },
        // {
        //   arrow: {
        //     enabled: Boolean(arrowNode),
        //     element: arrowNode
        //   }
        // },
        {
          name: 'applyStyle',
          enabled: false,
        },
        {
          name: 'updateStateModifier',
          enabled: true,
          order: 900,
          // @ts-ignore
          fn: updatePopperState,
        },
      ],
    });

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arrowNode,
    referenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers,
  ]);

  // TODO: Look into whether this is the right way to schedule update
  // for items like a tooltip on the graph which needs to update
  // in case we are hovering above another element.
  React.useEffect(() => {
    if (!popperInstance.current || !enableScheduleUpdate) {
      return;
    }
    popperInstance.current.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return popperStyles;
}

export { usePopper };
