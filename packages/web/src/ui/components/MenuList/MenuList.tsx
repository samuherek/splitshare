import React from 'react';
import clsx from 'clsx';
import List from '../List/List';
import { useForkRef } from '../../utils/ref';
import { StandardProps } from '../types';
import { ListProps } from '../List';

export interface MenuListProps extends StandardProps<ListProps> {
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   */
  autoFocus?: boolean;
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   */
  autoFocusItem?: boolean;
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * If `true`, will allow focus on disabled items.
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the menu items will not wrap focus.
   */
  disableListWrap?: boolean;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant?: 'menu' | 'selectedMenu';
}

export const classes = {
  root: 'MenuList',
};

const MenuList = React.forwardRef<unknown, MenuListProps>(function Menu(
  props,
  ref
) {
  const {
    // actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    // disabledItemsFocusable = false,
    // disableListWrap = false,
    // onKeyDown,
    ...rest
  } = props;

  const listRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(listRef, ref);

  let activeItemIndex = -1;

  const items = React.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      const newChildProps: any = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }

      // FIXME: typing
      // @ts-ignore
      if (child?.props?.tabIndex === undefined && variant === 'selectedMenu') {
        newChildProps.tabIndex = 0;
      }

      // FIXME: typing
      // @ts-ignore
      return React.cloneElement(child, newChildProps);
    }

    return child;
  });

  return (
    <List
      role="menu"
      ref={handleRef}
      className={clsx(className, classes.root)}
      // onKeyDown={handleKeyDown}
      tabIndex={autoFocus ? 0 : -1}
      {...rest}
    >
      {items}
    </List>
  );
});

export default MenuList;
