import React from 'react';
import { StandardProps } from '../types';
import { TransitionProps } from '../../core/utils/transitions';

export interface BackdropProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible?: boolean;
  /**
   * If `true`, the backdrop is open.
   */
  open: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
}
