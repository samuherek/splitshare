import * as React from 'react';

const SvgBack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    aria-hidden="true"
    display="block"
    fill="currentColor"
    focusable="false"
    role="presentation"
    {...props}
  >
    <path d="M97.102 61.801c0 15.801-12.898 28.699-28.699 28.699-3.602 0-6.5-2.898-6.5-6.5s2.898-6.5 6.5-6.5c8.602 0 15.699-7 15.699-15.699 0-8.602-7-15.699-15.699-15.699H25.102l12.602 12.602c2.5 2.5 2.5 6.7 0 9.2-1.3 1.3-2.898 1.898-4.602 1.898-1.699 0-3.3-.602-4.601-1.899L4.8 44.301c-2.5-2.5-2.5-6.699 0-9.199l23.7-23.699c2.5-2.5 6.699-2.5 9.199 0s2.5 6.7 0 9.2L25.102 33.2h43.301c15.797 0 28.699 12.801 28.699 28.602z" />
  </svg>
);

export default SvgBack;
