import React from 'react';
import { render } from '../../../test-utils/test-utils';
import FormControl, { classes } from '../FormControl';

it('should match snapshots', () => {
  const { container } = render(<FormControl />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should render <FormControl /> correctly', () => {
  const { container } = render(<FormControl />);
  const fc = container.firstChild;

  expect(fc).toHaveClass(classes.root);
  expect(fc).not.toHaveClass(classes.disabled);
  expect(fc).not.toHaveClass(classes.error);
  expect(fc).not.toHaveClass(classes.filled);
  expect(fc).not.toHaveClass(classes.focused);
  expect(fc).not.toHaveClass(classes.required);
  expect(fc).not.toHaveClass(classes.fullWidth);
  expect(fc).toHaveStyleRule('position', 'relative');
  expect(fc).toHaveStyleRule('display', 'inline-flex');
  expect(fc).toHaveStyleRule('flex-direction', 'column');
});

test('prop: disabled should have class', () => {
  const { container } = render(<FormControl disabled />);
  const fc = container.firstChild;
  expect(fc).toHaveClass(classes.disabled);
});

test('prop: error should have class', () => {
  const { container } = render(<FormControl error />);
  const fc = container.firstChild;
  expect(fc).toHaveClass(classes.error);
});

test('prop: required should have class', () => {
  const { container } = render(<FormControl required />);
  const fc = container.firstChild;
  expect(fc).toHaveClass(classes.required);
});

test('prop: fullWidth should have class', () => {
  const { container } = render(<FormControl fullWidth />);
  const fc = container.firstChild;
  expect(fc).toHaveClass(classes.fullWidth);
});
