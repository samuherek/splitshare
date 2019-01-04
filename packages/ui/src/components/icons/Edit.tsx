import * as React from 'react';

const SvgEdit = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M88.062 29.613l-17.676-17.68a1.999 1.999 0 0 0-2.828 0l-10.66 10.664c-.004 0-.004.004-.004.004l-.004.004-40.48 40.477a2.006 2.006 0 0 0-.547 1.02l-4.476 22.155a2.002 2.002 0 0 0 2.356 2.355l22.155-4.48c.387-.078.738-.27 1.02-.547L88.063 32.44a1.992 1.992 0 0 0 0-2.828zm-45.488 42.66l-6.012-6.012 25.43-25.43a2 2 0 1 0-2.828-2.828l-25.43 25.43-6.012-6.012L58.305 26.84l14.849 14.852zm-8.059 8.059l-18.609 3.761 3.762-18.609 5.23-5.23 14.853 14.848zm41.47-41.47L61.135 24.012l7.836-7.836L83.82 31.027z" />
  </svg>
);

export default SvgEdit;
