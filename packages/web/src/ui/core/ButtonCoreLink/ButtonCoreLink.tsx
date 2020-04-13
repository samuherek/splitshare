import React from 'react';
import ButtonCore, { ButtonCoreProps } from '../ButtonCore';

export interface ButtonCoreLinkProps extends ButtonCoreProps {}

export function useButtonCoreLink(
  props: ButtonCoreLinkProps,
  ref: React.Ref<any>
) {
  return {
    props: {
      ...props,
      Component: 'a',
    },
    ref,
  };
}

const ButtonCoreLink = React.forwardRef<any, ButtonCoreLinkProps>(
  (originalProps, originalRef) => {
    const { ref, props } = useButtonCoreLink(originalProps, originalRef);

    // FIXME: not sure how to type the ref
    // @ts-ignore
    return <ButtonCore ref={ref} {...props} />;
  }
);

export default ButtonCoreLink;
