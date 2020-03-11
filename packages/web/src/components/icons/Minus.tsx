import * as React from 'react';

const SvgMinus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 10 2"
    width="1em"
    height="1em"
    aria-hidden="true"
    display="block"
    fill="currentColor"
    focusable="false"
    role="presentation"
    {...props}
  >
    <path d="M.857 2a.43.43 0 01-.428-.429V.43A.43.43 0 01.857 0h8.286a.43.43 0 01.428.429V1.57A.43.43 0 019.143 2H.857z" />
  </svg>
);

export default SvgMinus;
