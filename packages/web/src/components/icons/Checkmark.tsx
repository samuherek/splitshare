import * as React from 'react';

const SvgCheckmark = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M39.496 63.223L22.512 46.239l-5.844 5.844L39.488 75l43.844-43.75-5.89-5.89z" />
  </svg>
);

export default SvgCheckmark;
