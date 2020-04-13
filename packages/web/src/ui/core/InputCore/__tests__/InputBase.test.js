import React from 'react';
import { render } from '../../../test-utils/test-utils';
import InputAdornment from '../../../components/InputAdornment';
import InputBase, { classes } from '../InputBase';

test('should match snapshots', () => {
  const { container } = render(<InputBase />);
  expect(container.firstChild).toMatchSnapshot();
});

test('should render and <input /> correctly', () => {
  const value = 'input';
  const { getByDisplayValue } = render(<InputBase value={value} />);
  const input = getByDisplayValue(/input/i);

  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveClass(classes.input);
  expect(input).not.toHaveAttribute('required');
  expect(input).toHaveAttribute('aria-invalid', 'false');
  expect(input).toHaveAttribute('value', value);
});

test('should render input inside a wrapper div', () => {
  const { container } = render(<InputBase />);
  const wrapper = container.firstChild;
  const wrapperChild = wrapper.firstChild;

  expect(wrapper).toHaveClass(classes.root);
  expect(wrapperChild).toHaveAttribute('type', 'text');
  expect(wrapperChild).toHaveClass(classes.input);
});

test('prop: multiline should render a textarea', () => {
  const { container } = render(<InputBase multiline />);
  expect(container.querySelectorAll('textarea')).toHaveLength(1);
});

test('prop: disabled -> should render disabled input', () => {
  const { container } = render(<InputBase disabled />);
  const input = container.querySelector('input');

  expect(input).toHaveClass(classes.input);
  expect(input).toHaveClass(classes.disabled);
  expect(input).toHaveStyleRule('pointer-events', 'none', {
    modifier: ':disabled',
  });
});

test('prop: startAdornment and endAdornment should match snapshots', () => {
  const start = render(
    <InputBase
      placeholder="Start"
      startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
    />
  );

  expect(start.container.firstChild).toMatchSnapshot();

  const end = render(
    <InputBase
      placeholder="End"
      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
    />
  );

  expect(end.container.firstChild).toMatchSnapshot();

  const startEnd = render(
    <InputBase
      placeholder="Start and End"
      startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
    />
  );

  expect(startEnd.container.firstChild).toMatchSnapshot();
});

test('prop: startAdornment should render adornment', () => {
  const { container } = render(
    <InputBase
      placeholder="Start"
      startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
    />
  );
  const wrap = container.firstChild;

  expect(wrap).toHaveClass(classes.prefix);
  expect(wrap.querySelector('input')).toHaveClass(classes.prefix);
});

test('prop: endAdornment should render adornment', () => {
  const { container } = render(
    <InputBase
      placeholder="End"
      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
    />
  );
  const wrap = container.firstChild;

  expect(wrap).toHaveClass(classes.suffix);
  expect(wrap.querySelector('input')).toHaveClass(classes.suffix);
});
