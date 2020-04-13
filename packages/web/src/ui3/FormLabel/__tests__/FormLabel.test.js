import React from 'react';
import { render } from '../../../test-utils/test-utils';
import FormLabel, { classes } from '../FormLabel';

test('should match snapshot', () => {
  const { getByText } = render(<FormLabel>Label</FormLabel>);
  expect(getByText(/label/i)).toMatchSnapshot();
});

test('should render <FormLabel /> correctly', () => {
  const value = 'label';
  const { getByText } = render(<FormLabel>{value}</FormLabel>);
  const label = getByText(/label/i);

  expect(label).toHaveProperty('nodeName', 'LABEL');
  expect(label).toHaveClass(classes.root);
  expect(label).not.toHaveClass(classes.focused);
  expect(label).not.toHaveClass(classes.filled);
  expect(label).not.toHaveClass(classes.error);
  expect(label).not.toHaveClass(classes.disabled);
  expect(label).toHaveStyleRule('line-height', expect.any(String));
  expect(label).toHaveStyleRule('padding', expect.any(String));
  expect(label).toHaveStyleRule('font-size', expect.any(String));
  expect(label).toHaveStyleRule('color', 'inherit');
});

test('prop: disabled should have class and styles', () => {
  const { getByText } = render(<FormLabel disabled>label</FormLabel>);
  const label = getByText(/label/i);

  expect(label).toHaveClass(classes.disabled);
  // TODO: look into why this doesn't work
  // expect(label).toHaveStyleRule('pointer-events', 'none', {
  //   modifier: '.disabled',
  // });
});

test('prop: focused should have class', () => {
  const { getByText } = render(<FormLabel focused>label</FormLabel>);
  expect(getByText(/label/i)).toHaveClass(classes.focused);
});

test('prop: filled should have class', () => {
  const { getByText } = render(<FormLabel filled>label</FormLabel>);
  expect(getByText(/label/i)).toHaveClass(classes.filled);
});

test('prop: error should have class', () => {
  const { getByText } = render(<FormLabel error>label</FormLabel>);
  expect(getByText(/label/i)).toHaveClass(classes.error);
});

test('prop: required should not show (optional)', () => {
  const { queryByText } = render(<FormLabel required>label</FormLabel>);
  const optional = queryByText(/optional/i);

  // expect(optional).toHaveClass(classes.asterisk);
  expect(optional).toBeNull();
});

test('prop: required should show (optional) if not required', () => {
  const { getByText } = render(<FormLabel required={false}>label</FormLabel>);
  const optional = getByText(/optional/i);

  expect(optional).toHaveClass(classes.optional);
});
