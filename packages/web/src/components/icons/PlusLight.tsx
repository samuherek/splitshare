import * as React from 'react';

const SvgPlusLight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    data-prefix="fal"
    data-icon="plus"
    className="plus-light_svg__svg-inline--fa plus-light_svg__fa-plus plus-light_svg__fa-w-12"
    viewBox="0 0 384 512"
    width="1em"
    height="1em"
    display="block"
    fill="currentColor"
    focusable="false"
    role="presentation"
    {...props}
  >
    <path
      fill="currentColor"
      d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

export default SvgPlusLight;
