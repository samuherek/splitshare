import React from 'react';
import { render } from '../../../test-utils/test-utils';
import SnackbarContent, { classes } from '../SnackbarContent';

test('should match snapshots', () => {
  const { container } = render(<SnackbarContent />);
  expect(container.firstChild).toMatchSnapshot();
});

test('should apply default styles and classes', () => {
  const { container } = render(<SnackbarContent />);
  const snackbarContent = container.firstChild;

  expect(snackbarContent).toHaveClass(classes.root);
});

test('prop: message should render the message', () => {
  const { getByText } = render(<SnackbarContent message="message" />);
  expect(getByText(/message/i)).toBeDefined();
});
