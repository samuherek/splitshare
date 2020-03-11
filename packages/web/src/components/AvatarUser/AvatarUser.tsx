import clsx from 'clsx';
import React from 'react';
import Gravatar from 'react-gravatar';
import styled from 'styled-components';
import Avatar from '../../ui/Avatar';

type Props = {
  className?: string;
  email: string;
  fallback?: string;
  src?: void;
  srcSet?: void;
  sizes?: void;
  children?: void;
  size?: number;
};

export const classes = {
  root: 'AvatarUser',
};

// $FlowFixMe
const WrapStyled = styled(Avatar)`
  background: #f7f7f7;

  img {
    width: 100%;
    height: auto;
    object-fill: contained;
    z-index: 2;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
  }
`;

const AvatarUser = React.forwardRef<Props, any>(function AvatarUser(
  props,
  ref
) {
  const {
    className,
    email,
    fallback,
    src,
    srcSet,
    sizes,
    size = 40,
    children,
    ...rest
  } = props;
  return (
    <Avatar
      component={WrapStyled}
      ref={ref}
      className={clsx(className, classes.root)}
      size={size}
      {...rest}
    >
      <Gravatar email={email} default="blank" size={size} />
      {fallback ? <span>{fallback}</span> : null}
    </Avatar>
  );
});

export default AvatarUser;
