import React from 'react';
import { render } from '../../../test-utils/test-utils';
import Snackbar, { classes } from '../Snackbar';

test('should match snapshots', () => {
  const { container } = render(<Snackbar open={true} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('should apply default styles and classes', () => {
  const { container } = render(<Snackbar open={true} />);
  const snackbar = container.firstChild;

  expect(snackbar).toHaveClass(classes.root);
  expect(snackbar.firstChild).toBeDefined();
  expect(snackbar).toHaveStyleRule('position', 'fixed');
});

test('props: open should render snackbar or not', () => {
  const openIsFalse = render(<Snackbar open={false} />);
  expect(openIsFalse.container.firstChild).toBeNull();

  const openIsTrue = render(<Snackbar open={true} />);
  expect(openIsTrue.container.firstChild).toBeDefined();
});

test('props: message should render the message', () => {
  const { getByText } = render(<Snackbar open={true} message="message" />);
  expect(getByText(/message/i)).toBeDefined();
});
