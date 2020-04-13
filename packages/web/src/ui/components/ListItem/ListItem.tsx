import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import ButtonBase from '../ButtonBase/ButtonBase';

export interface ListItemProps {
  children: React.ReactNode;
  button?: boolean;
  component: React.ReactNode;
  buttonComponent?: any;
  buttonProps?: object;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  selected?: boolean;
  // alignItems: 'flex-start' | 'center',
}

export const classes = {
  root: 'ListItem',
  disabled: 'disabled',
  selected: 'selected',
};

const ListItemStyled = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  /* padding-top: 8px;
  padding-bottom: 8px; */

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
const ListItem = React.forwardRef<unknown, ListItemProps>(function ListItem(
  props,
  ref
) {
  const {
    children,
    disabled,
    selected,
    // autoFocus = false,
    // alignItems = 'center',
    button = false,
    buttonComponent: ButtonComponent = ButtonBase,
    buttonProps = {},
    component = 'li',
    className,
    ...rest
  } = props;

  // TODO: Autofocus logic added here.

  let componentProps = {
    className: clsx(className, classes.root, {
      [classes.disabled]: disabled,
      [classes.selected]: selected,
    }),
    as: component,
    ...rest,
  };

  if (button) {
    return (
      // FIXME: typing
      // @ts-ignore
      <ListItemStyled ref={ref} {...componentProps}>
        <ButtonComponent {...buttonProps}>{children}</ButtonComponent>
      </ListItemStyled>
    );
  }

  return (
    // FIXME: typing
    // @ts-ignore
    <ListItemStyled ref={ref} {...componentProps}>
      {children}
    </ListItemStyled>
  );
});

export default ListItem;
