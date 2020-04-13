import React from 'react';
import { render } from '../../../test-utils/test-utils';
import ButtonAsync, { classes } from '../ButtonAsync';

test('should match snapshots', () => {
  const emptyButton = render(<ButtonAsync />);
  expect(emptyButton.container.firstChild).toMatchSnapshot();

  const textButton = render(<ButtonAsync>Button</ButtonAsync>);
  expect(textButton.container.firstChild).toMatchSnapshot();

  const primaryTextButton = render(
    <ButtonAsync color="primary">Primary text</ButtonAsync>
  );
  expect(primaryTextButton.container.firstChild).toMatchSnapshot();

  const secondaryTextButton = render(
    <ButtonAsync color="secondary">Secondary text</ButtonAsync>
  );
  expect(secondaryTextButton.container.firstChild).toMatchSnapshot();

  const tertiaryTextButton = render(
    <ButtonAsync color="tertiary">Tertiary text</ButtonAsync>
  );
  expect(tertiaryTextButton.container.firstChild).toMatchSnapshot();

  const primaryContainedButton = render(
    <ButtonAsync color="primary" variant="contained">
      Primary contained
    </ButtonAsync>
  );
  expect(primaryContainedButton.container.firstChild).toMatchSnapshot();

  const secondaryContainedButton = render(
    <ButtonAsync color="secondary" variant="contained">
      >Secondary contained
    </ButtonAsync>
  );
  expect(secondaryContainedButton.container.firstChild).toMatchSnapshot();

  const tertiaryContainedButton = render(
    <ButtonAsync color="tertiary" variant="contained">
      >Tertiary contained
    </ButtonAsync>
  );
  expect(tertiaryContainedButton.container.firstChild).toMatchSnapshot();
});

test('should render with the default styles', () => {
  const { container } = render(<ButtonAsync />);
  const btn = container.firstChild;

  expect(btn).toHaveClass(classes.root);
  expect(btn).toHaveStyleRule('position', 'relative');
});

// TODO: redo this test to only check for element
// not the actual implementation
test('should render with the loader icon', () => {
  const { container } = render(<ButtonAsync />);
  const icons = container.querySelectorAll('i');

  expect(icons.length).toBe(3);
});
