import * as React from 'react';

const SvgNotification = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 50 50"
    width="1em"
    height="1em"
    aria-hidden="true"
    display="block"
    fill="currentColor"
    focusable="false"
    role="presentation"
    {...props}
  >
    <path
      className="notification_svg__st0"
      d="M42.5 35.6l-3.9-5.5v-7.5c0-6.9-5.3-12.6-12-13.3v-.8c0-.7-.6-1.3-1.3-1.3-.7 0-1.3.6-1.3 1.3v.8c-6.8.6-12 6.4-12 13.3v7.5l-4.4 5.5c-.3.4-.4.9-.2 1.4.2.4.7.7 1.2.7H19c.6 2.9 3.2 5.1 6.3 5.1 3.1 0 5.7-2.2 6.3-5.1h9.9c.5 0 .9-.3 1.1-.7.3-.5.2-1-.1-1.4zm-17.2 4.6c-1.7 0-3.1-1.1-3.6-2.6H29c-.6 1.5-2 2.6-3.7 2.6zm-14.1-5.1l3-3.7c.2-.2.3-.5.3-.8v-7.9c0-5.9 4.8-10.8 10.8-10.8 5.9 0 10.8 4.8 10.8 10.8v7.9c0 .3.1.5.2.7l2.7 3.8H11.2z"
    />
  </svg>
);

export default SvgNotification;
