import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const WrapStyled = styled.div``;

const classes = {
  root: 'StaticWrapper',
};

function StaticWrapper({ className, ...rest }: any) {
  return <WrapStyled className={clsx(className, classes.root)} {...rest} />;
}

export default StaticWrapper;
