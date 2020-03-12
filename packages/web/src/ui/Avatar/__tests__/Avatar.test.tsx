import React from 'react';
import { render } from '../../../test-utils/test-utils';
import Avatar, { classes } from '../Avatar';

test('should match snapshots', () => {
  const imgAvatar = render(
    <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/profile-img.jpg" />
  );
  expect(imgAvatar.container.firstChild).toMatchSnapshot();

  const textAvatar = render(<Avatar>A</Avatar>);
  expect(textAvatar.container.firstChild).toMatchSnapshot();
});

test('render <Avatar /> correctly', () => {
  const { container } = render(<Avatar />);
  const avatar = container.firstChild;

  expect(avatar).toHaveClass(classes.root);
  // @ts-ignore
  expect(avatar).toHaveProperty('nodeName', 'DIV');
  // @ts-ignore
  expect(avatar).toHaveStyleRule('overflow', 'hidden');
  // @ts-ignore
  expect(avatar).toHaveStyleRule('position', 'relative');
  // @ts-ignore
  expect(avatar).toHaveStyleRule('width', '40px');
  // @ts-ignore
  expect(avatar).toHaveStyleRule('height', '40px');
});

test('prop: variant circle should have correct class and style', () => {
  const { container } = render(<Avatar />);
  const avatar = container.firstChild;

  expect(avatar).toHaveClass(classes.circle);
  // @ts-ignore
  expect(avatar).toHaveStyleRule('border-radius', '50%');
});

test('prop: variant square should have correct class and style', () => {
  const { container } = render(<Avatar variant="square" />);
  const avatar = container.firstChild;

  expect(avatar).toHaveClass(classes.square);
  // @ts-ignore
  expect(avatar).toHaveStyleRule('border-radius', undefined);
});

test('prop: size should apply correct size in px', () => {
  const { container } = render(<Avatar size={20} />);
  const avatar = container.firstChild;

  // @ts-ignore
  expect(avatar).toHaveStyleRule('width', '20px');
  // @ts-ignore
  expect(avatar).toHaveStyleRule('height', '20px');
});

test('prop: component should render provided component as wrapper', () => {
  const { container } = render(<Avatar component="span" />);
  const avatar = container.firstChild;

  expect(avatar).toHaveProperty('nodeName', 'SPAN');
});

test('prop: src should render image if provided', () => {
  const { container } = render(
    <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/profile-img.jpg" />
  );
  const img = container.querySelector('img');

  expect(img).toHaveClass(classes.img);
  expect(img).toHaveAttribute('src');
});

test('should render child if child is provided', () => {
  const { getByText } = render(<Avatar>A</Avatar>);
  expect(getByText(/a/i)).toBeDefined();
});

test('should render image if src and child is provided', () => {
  const { container, queryByText } = render(
    <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/profile-img.jpg">
      A
    </Avatar>
  );
  const img = container.querySelector('img');

  expect(img).toBeDefined();
  expect(queryByText(/a/i)).toBeNull();
});
