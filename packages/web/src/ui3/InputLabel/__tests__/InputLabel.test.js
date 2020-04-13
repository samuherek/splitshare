import React from 'react';
import { render } from '../../../test-utils/test-utils';
import InputLabel, { classes } from '../InputLabel';

test('should match snapshot', () => {
  const { getByText } = render(<InputLabel>Label</InputLabel>);
  expect(getByText(/label/i)).toMatchSnapshot();
});

test('should render <InputLabel /> correctly', () => {
  const { getByText } = render(<InputLabel>Label</InputLabel>);
  const label = getByText(/label/i);

  expect(label).toHaveProperty('nodeName', 'LABEL');
  expect(label).toHaveClass(classes.root);
  expect(label).toHaveStyleRule('color', expect.any(String));
  // TODO: look why this is not working
  // expect(label).toHaveStyleRule('pointer-events', 'none', {
  //   modifier: '.disabled',
  // });
});
