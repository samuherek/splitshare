import React from 'react';
import { render } from '../../../test-utils/test-utils';
import TextField from '../TextField';

test('should match snapshots', () => {
  const { container } = render(<TextField />);
  expect(container.firstChild).toMatchSnapshot();
});

test('shouold add tests', () => {
  console.log('TODO: add tests');
});
