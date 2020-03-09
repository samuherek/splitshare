import React from "react";
import { render } from "../../../test-utils/test-utils";
import ButtonLoader, { classes } from "../ButtonLoader";

test("should match snapshots", () => {
  const defaultLoader = render(<ButtonLoader />);
  expect(defaultLoader.container.firstChild).toMatchSnapshot();

  const primaryTextButton = render(<ButtonLoader color="primary" />);
  expect(primaryTextButton.container.firstChild).toMatchSnapshot();

  const secondaryTextButton = render(<ButtonLoader color="secondary" />);
  expect(secondaryTextButton.container.firstChild).toMatchSnapshot();

  const tertiaryTextButton = render(<ButtonLoader color="tertiary" />);
  expect(tertiaryTextButton.container.firstChild).toMatchSnapshot();

  const primaryContainedButton = render(
    <ButtonLoader color="primary" variant="contained" />
  );
  expect(primaryContainedButton.container.firstChild).toMatchSnapshot();

  const secondaryContainedButton = render(
    <ButtonLoader color="secondary" variant="contained" />
  );
  expect(secondaryContainedButton.container.firstChild).toMatchSnapshot();

  const tertiaryContainedButton = render(
    <ButtonLoader color="tertiary" variant="contained" />
  );
  expect(tertiaryContainedButton.container.firstChild).toMatchSnapshot();
});

test("should render with the default styles", () => {
  const { container } = render(<ButtonLoader />);
  const loader = container.firstChild;

  expect(loader).toHaveClass(classes.root);
  expect(loader).toHaveProperty("nodeName", "SPAN");
  // @ts-ignore
  expect(loader).toHaveStyleRule("display", "flex");
  // @ts-ignore
  expect(loader).toHaveStyleRule("position", "absolute");
  // @ts-ignore
  expect(loader).toHaveStyleRule("top", "50%");
  // @ts-ignore
  expect(loader).toHaveStyleRule("left", "50%");
  // @ts-ignore
  expect(loader).toHaveStyleRule("transform", "translate(-50%,-50%)");
});

test("should render with the loader icon", () => {
  const { container } = render(<ButtonLoader />);
  const icons = container.querySelectorAll("i");

  expect(icons.length).toBe(3);
});
