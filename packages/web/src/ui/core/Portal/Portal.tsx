import React from 'react';
import ReactDOM from 'react-dom';
import { setRef } from '../../utils/ref';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
}

export function usePortal(props: PortalProps, ref: React.Ref<any>) {
  const { container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  // const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

  React.useLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(document.body);
    }
  }, [container, disablePortal]);

  React.useLayoutEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  // TODO: Not sure if we want to support this???? Is it necessary
  // if (disablePortal) {
  //   if (React.isValidElement(children)) {
  //     return React.cloneElement(children, {
  //       // ref: handleRef,
  //     });
  //   }
  //   return children;
  // }

  return {
    props,
    ref,
    mountNode,
  };
}

const Portal = React.forwardRef<any, PortalProps>(function Portal(
  originalProps,
  originalRef
) {
  const { mountNode, props } = usePortal(originalProps, originalRef);

  return mountNode
    ? ReactDOM.createPortal(props.children, mountNode)
    : mountNode;
});

export default Portal;
