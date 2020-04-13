import React from 'react';
import { render } from '../../../test-utils/test-utils';
import Fade from '../Grow';

test('should match snapshots', () => {
  const { container } = render(
    <Fade>
      <span>something</span>
    </Fade>
  );
  expect(container.firstChild).toMatchSnapshot();
});
