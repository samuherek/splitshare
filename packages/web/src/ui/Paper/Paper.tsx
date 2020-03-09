import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  component?: any;
  children: React.ReactNode;
  elevation?: number;
}

export const classes = {
  root: 'SSPaper',
  elevation: 'elevation',
};

const elevationShadow = [
  'none',
  '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
  '0 7px 17px 0 rgba(0,0,0,0.05)',
];

const PaperStyled = styled.div<{
  overflowY?: 'hidden' | 'auto';
  elevation?: number;
}>`
  display: flex;
  position: relative;
  overflow-y: ${({ overflowY = 'auto' }) => overflowY};
  flex-direction: column;
  flex: 0 1 auto;
  box-shadow: ${({ elevation = 0 }) => elevationShadow[elevation]};
  background-color: #fff;
  border-radius: 4px;
`;

const Paper = React.forwardRef<Props, any>((props, ref) => {
  const {
    className,
    component: Component = PaperStyled,
    elevation = 0,
    ...rest
  } = props;

  // warning(
  //   elevation >= 0 && elevation < 2,
  //   `Nexoya: this elevation ${elevation} is not implemented`
  // );

  return (
    <Component
      ref={ref}
      className={clsx(
        className,
        classes.root,
        `${classes.elevation}-${elevation}`
      )}
      elevation={elevation}
      // overflowY={elevation > 0 ? 'auto' : 'none'}
      {...rest}
    />
  );
});

export default Paper;
