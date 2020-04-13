import React from 'react';
import { useForkRef } from '../../utils/ref';
import ownerDocument from '../utils/ownerDocument';

export interface TrapFocusProps {
  children?: React.ReactNode;
  open: boolean;
  getDoc: () => any;
}

export function useTrapFocus(props: TrapFocusProps, ref?: React.Ref<any>) {
  const { open, getDoc, children } = props;

  const ignoreNextEnforceFocus = React.useRef<boolean | void>();
  const sentinelStart = React.useRef<HTMLDivElement | null>(null);
  const sentinelEnd = React.useRef<HTMLDivElement | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);
  const nodeToRestore = React.useRef<HTMLElement | null | void>();

  // FIXME: figure out how to type it
  // @ts-ignore
  const handleRef = useForkRef(children?.ref, rootRef);

  // ⚠️ You may rely on React.useMemo as a performance optimization, not as a semantic guarantee.
  // https://reactjs.org/docs/hooks-reference.html#usememo
  React.useMemo(() => {
    if (!open || typeof window === 'undefined') {
      return;
    }

    nodeToRestore.current = getDoc().activeElement;
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    if (rootRef.current && !rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            [
              'Material-UI: the modal content node does not accept focus.',
              'For the benefit of assistive technologies, ' +
                'the tabIndex of the node is being set to "-1".',
            ].join('\n')
          );
        }
        rootRef.current.setAttribute('tabIndex', '-1');
      }
      rootRef.current.focus();
    }

    const contain = () => {
      if (ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (rootRef.current && !rootRef.current.contains(doc.activeElement)) {
        rootRef.current.focus();
      }
    };

    const loopFocus = (event: any) => {
      // 9 = Tab
      if (event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (doc.activeElement === rootRef.current) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          sentinelEnd.current?.focus();
        } else {
          sentinelStart.current?.focus();
        }
      }
    };

    doc.addEventListener('focus', contain, true);
    doc.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      contain();
    }, 50);

    return () => {
      clearInterval(interval);

      doc.removeEventListener('focus', contain, true);
      doc.removeEventListener('keydown', loopFocus, true);

      // restoreLastFocus()
      // if (!disableRestoreFocus) {
      // In IE 11 it is possible for document.activeElement to be null resulting
      // in nodeToRestore.current being null.
      // Not all elements in IE 11 have a focus method.
      // Once IE 11 support is dropped the focus() call can be unconditional.
      if (nodeToRestore.current && nodeToRestore.current.focus) {
        nodeToRestore.current.focus();
      }

      nodeToRestore.current = null;
      // }
    };
  }, [open]);

  return {
    props,
    ref,
    sentinelStart,
    handleRef,
    sentinelEnd,
  };
}

function TrapFocus(originalProps: TrapFocusProps) {
  const { sentinelStart, handleRef, sentinelEnd, props } = useTrapFocus(
    originalProps
  );

  return (
    <React.Fragment>
      <div tabIndex={0} ref={sentinelStart} data-test="sentinelStart" />
      {React.cloneElement(
        // FIXME: figure out the typing
        // @ts-ignore
        props.children,
        { ref: handleRef }
      )}
      <div tabIndex={0} ref={sentinelEnd} data-test="sentinelEnd" />
    </React.Fragment>
  );
}

export default TrapFocus;

/*
In the future, we should be able to replace TrapFocus with:
https://github.com/facebook/react/blob/master/packages/react-events/docs/FocusScope.md
```jsx
import FocusScope from 'react-dom/FocusScope';
function TrapFocus(props) {
  const {
    children
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    open,
  } = props;
  if (!open) {
    return children;
  }
  return (
    <FocusScope
      autoFocus={!disableAutoFocus}
      contain={!disableEnforceFocus}
      restoreFocus={!disableRestoreFocus}
    >
      {children}
    </FocusScope>
  );
}
```
*/
