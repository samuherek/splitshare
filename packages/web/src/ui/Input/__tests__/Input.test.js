import React from 'react';
import { render } from '../../../test-utils/test-utils';
import Input, { classes } from '../Input';

test('should match snapshots', () => {
  const empty = render(<Input />);
  expect(empty.container.firstChild).toMatchSnapshot();

  const value = 'value';
  const withValue = render(<Input value={value} />);
  expect(withValue.container.firstChild).toMatchSnapshot();
});

test('should render with root classes and base styles', () => {
  const { container } = render(<Input />);
  const wrap = container.firstChild;

  expect(wrap).toHaveClass(classes.outlined);
  expect(wrap).toHaveStyleRule('padding', expect.any(String));
  expect(wrap).toHaveStyleRule('border-radius', expect.any(String));
  expect(wrap).toHaveStyleRule('box-shadow', expect.any(String));
  expect(wrap).toHaveStyleRule('font-size', expect.any(String), {
    modifier: 'input',
  });
  expect(wrap).toHaveStyleRule('font-weight', expect.any(String), {
    modifier: 'input',
  });
  expect(wrap).toHaveStyleRule('letter-spacing', expect.any(String), {
    modifier: 'input',
  });
  expect(wrap).toHaveStyleRule('color', expect.any(String), {
    modifier: 'input',
  });
});
