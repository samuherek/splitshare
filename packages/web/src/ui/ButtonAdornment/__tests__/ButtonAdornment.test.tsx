import React from "react";
import { render } from "../../../test-utils/test-utils";
import ButtonAdornment, { classes } from "../ButtonAdornment";

test("should match snapshots", () => {
  const empty = render(<ButtonAdornment />);
  expect(empty.container.firstChild).toMatchSnapshot();

  const withValue = render(<ButtonAdornment>A</ButtonAdornment>);
  expect(withValue.container.firstChild).toMatchSnapshot();
});

test("should render adornment correctly", () => {
  const { container } = render(<ButtonAdornment />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.root);
});

test("prop: position start should have correct class", () => {
  const { container } = render(<ButtonAdornment position="start" />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.positionStart);
});

test("prop: position end should have correct class", () => {
  const { container } = render(<ButtonAdornment position="end" />);
  const adornment = container.firstChild;

  expect(adornment).toHaveClass(classes.positionEnd);
});
