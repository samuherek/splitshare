import * as React from 'react';

const SvgLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 69 31"
    fill="currentColor"
    aria-hidden="true"
    display="block"
    focusable="false"
    role="presentation"
    {...props}
  >
    <path
      d="M22.77 4.066L0 30.898c1.993 0 7.038.102 11.27.102 4.232 0 8.357-3.837 9.89-5.755L42.32.05c-3.067-.076-9.89-.082-12.65.102s-5.29 2.2-6.9 3.914z"
      fill="#BEBEBE"
    />
    <path
      d="M49.45 4.066L26.68 30.898c1.993 0 7.038.102 11.27.102 4.232 0 8.357-3.837 9.89-5.755L69 .05c-3.067-.076-9.89-.082-12.65.102s-5.29 2.2-6.9 3.914z"
      fill="#E8E8E8"
    />
  </svg>
);

export default SvgLogo;
