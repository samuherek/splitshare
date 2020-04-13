import React from 'react';
import styled from 'styled-components';
import Popover from '../Popover';
import Paper from '../Paper';
import MenuList from '../MenuList';
import { StandardProps } from '../types';
import { PopoverProps } from '../Popover/Popover';
import {
  TransitionHandlerProps,
  TransitionProps,
} from '../../core/utils/transitions';
import { MenuListProps } from '../MenuList/MenuList';
import { PaperProps } from '../Paper/Paper';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>> {
  /**
   * The DOM element used to set the position of the menu.
   * @document
   */
  anchorEl?: PopoverProps['anchorEl'];
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   */
  autoFocus?: boolean;
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   */
  disableAutoFocusItem?: boolean;
  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps?: Partial<MenuListProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  // @ts-ignore
  onClose?: PopoverProps['onClose'];
  /**
   * Callback fired before the Menu enters.
   * @document
   */
  // @ts-ignore
  onEnter?: PopoverProps['onEnter'];
  /**
   * Callback fired when the Menu has entered.
   * @document
   */
  // @ts-ignore
  onEntered?: PopoverProps['onEntered'];
  /**
   * Callback fired when the Menu is entering.
   * @document
   */
  // @ts-ignore
  onEntering?: PopoverProps['onEntering'];
  /**
   * Callback fired before the Menu exits.
   * @document
   */
  // @ts-ignore
  onExit?: PopoverProps['onExit'];
  /**
   * Callback fired when the Menu has exited.
   * @document
   */
  // @ts-ignore
  onExited?: PopoverProps['onExited'];
  /**
   * Callback fired when the Menu is exiting.
   * @document
   */
  // @ts-ignore
  onExiting?: PopoverProps['onExiting'];
  /**
   * If `true`, the menu is visible.
   */
  open: boolean;
  /**
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  // @ts-ignore
  PopoverClasses?: PopoverProps['classes'];
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant?: 'menu' | 'selectedMenu';
}

export const classes = {
  root: 'Menu',
};

const PaperStyled = styled(Paper)`
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 16px;
  min-width: 16px;
  max-height: 200px;
  border-radius: 5px;
`;

const Menu = React.forwardRef<unknown, MenuProps>(function Menu(props, ref) {
  const {
    autoFocus,
    children,
    disableAutoFocusItem,
    onClose,
    onEntering,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = 'auto',
    ...rest
  } = props;

  // const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  // const menuListActionsRef = React.useRef(null);
  const contentAnchorRef = React.useRef(null);

  const getContentAnchorEl = () => contentAnchorRef.current;

  return (
    <Popover
      // @ts-ignore
      getContentAnchorEl={getContentAnchorEl}
      onClose={onClose}
      PaperProps={PaperProps}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      // transformOrigin={{
      //   vertical: "top",
      //   horizontal: "center"
      // }}
      {...rest}
    >
      <PaperStyled {...rest}>
        <MenuList>{children}</MenuList>
      </PaperStyled>
    </Popover>
  );
});

export default Menu;
