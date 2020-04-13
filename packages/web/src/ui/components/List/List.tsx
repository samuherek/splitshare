import * as React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { ListProps } from './List.d';

const UlStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`;

const List = React.forwardRef<unknown, ListProps>(function List(props, ref) {
  const {
    children,
    className,
    component: Component = UlStyled,
    ...other
  } = props;

  return (
    <Component className={clsx(className)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

export default List;
