import { render } from "../../../test-utils/test-utils";
import React from "react";
import Button, { classes } from "../Button";

test("should match snapshots", () => {
  const emptyButton = render(<Button />);
  expect(emptyButton.container.firstChild).toMatchSnapshot();

  const textButton = render(<Button>Button</Button>);
  expect(textButton.container.firstChild).toMatchSnapshot();

  const primaryTextButton = render(
    <Button color="primary">Primary text</Button>
  );
  expect(primaryTextButton.container.firstChild).toMatchSnapshot();

  const secondaryTextButton = render(
    <Button color="secondary">Secondary text</Button>
  );
  expect(secondaryTextButton.container.firstChild).toMatchSnapshot();

  const tertiaryTextButton = render(
    <Button color="tertiary">Tertiary text</Button>
  );
  expect(tertiaryTextButton.container.firstChild).toMatchSnapshot();

  const primaryContainedButton = render(
    <Button color="primary" variant="contained">
      Primary contained
    </Button>
  );
  expect(primaryContainedButton.container.firstChild).toMatchSnapshot();

  const secondaryContainedButton = render(
    <Button color="secondary" variant="contained">
      >Secondary contained
    </Button>
  );
  expect(secondaryContainedButton.container.firstChild).toMatchSnapshot();

  const tertiaryContainedButton = render(
    <Button color="tertiary" variant="contained">
      >Tertiary contained
    </Button>
  );
  expect(tertiaryContainedButton.container.firstChild).toMatchSnapshot();
});

test("should render with the root classes and base styles", () => {
  const { container } = render(<Button>Button</Button>);
  const button = container.firstChild;
  const label = button?.firstChild;

  expect(button).toHaveClass(classes.root);
  expect(label).toHaveClass(classes.label);

  // @ts-ignore
  expect(button).toHaveStyleRule("position", "relative");
  // @ts-ignore
  expect(button).toHaveStyleRule("border-radius", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("padding", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("font-weight", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("letter-spacing", expect.any(String));
});

test("can render a primary text button", () => {
  const { container } = render(<Button color="primary">Button</Button>);
  const button = container.firstChild;

  expect(button).toHaveClass(classes.primaryText);
  expect(button).not.toHaveClass(classes.primaryContained);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
});

test("can render a primary contained button", () => {
  const { container } = render(
    <Button color="primary" variant="contained">
      Button
    </Button>
  );
  const button = container.firstChild;

  expect(button).toHaveClass(classes.primaryContained);
  expect(button).not.toHaveClass(classes.primaryText);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("background-color", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("box-shadow", expect.any(String));
});

test("can render a secondary text button", () => {
  const { container } = render(<Button color="secondary">Button</Button>);
  const button = container.firstChild;

  expect(button).toHaveClass(classes.secondaryText);
  expect(button).not.toHaveClass(classes.secondaryContained);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
});

test("can render a secondary contained button", () => {
  const { container } = render(
    <Button color="secondary" variant="contained">
      Button
    </Button>
  );
  const button = container.firstChild;

  expect(button).toHaveClass(classes.secondaryContained);
  expect(button).not.toHaveClass(classes.secondaryText);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("background-color", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("box-shadow", expect.any(String));
});

test("can render a tertiary text button", () => {
  const { container } = render(<Button color="tertiary">Button</Button>);
  const button = container.firstChild;

  expect(button).toHaveClass(classes.tertiaryText);
  expect(button).not.toHaveClass(classes.tertiaryContained);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
});

test("can render a tertiary contained button", () => {
  const { container } = render(
    <Button color="tertiary" variant="contained">
      Button
    </Button>
  );
  const button = container.firstChild;

  expect(button).toHaveClass(classes.tertiaryContained);
  expect(button).not.toHaveClass(classes.tertiaryText);
  // @ts-ignore
  expect(button).toHaveStyleRule("color", expect.any(String));
  // @ts-ignore
  expect(button).toHaveStyleRule("background-color", expect.any(String));
});
