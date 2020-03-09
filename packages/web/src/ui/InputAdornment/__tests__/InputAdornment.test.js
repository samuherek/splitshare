import React from 'react';
import { render } from '../../../test-utils/test-utils';
import InputAdornment, { classes } from '../InputAdornment';

test('should match snapshots', () => {
  const empty = render(<InputAdornment />);
  expect(empty.container.firstChild).toMatchSnapshot();

  const withValue = render(<InputAdornment>A</InputAdornment>);
  expect(withValue.container.firstChild).toMatchSnapshot();
});

test('should render adornment', () => {
  const { container } = render(<InputAdornment />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.root);
});

test('prop: position start should have correct class', () => {
  const { container } = render(<InputAdornment position="start" />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.positionStart);
});

test('prop: position end should have correct class', () => {
  const { container } = render(<InputAdornment position="end" />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.positionEnd);
});
