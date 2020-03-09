import React from "react";
import { render } from "../../../test-utils/test-utils";
import { Bell } from "../../icons";
import ButtonIcon, { classes } from "../ButtonIcon";

test("should match snapshots", () => {
  const empty = render(<ButtonIcon />);
  expect(empty.container.firstChild).toMatchSnapshot();

  const withIcon = render(
    <ButtonIcon>
      <Bell />
    </ButtonIcon>
  );
  expect(withIcon.container.firstChild).toMatchSnapshot();
});

test("should apply default styles to button", () => {
  const { container } = render(<ButtonIcon />);
  const button = container.firstChild;

  expect(button).toHaveClass(classes.root);
  // @ts-ignore
  expect(button).toHaveStyleRule("flex", "0 0 auto");
  // @ts-ignore
  expect(button).toHaveStyleRule("cursor", "pointer");
  // @ts-ignore
  expect(button).toHaveStyleRule("border-radius", "50%");
  // @ts-ignore
  expect(button).toHaveStyleRule("padding", "9px");
});

test("should apply default styles to button label", () => {
  const { container } = render(<ButtonIcon />);
  const label = container.firstChild?.firstChild;

  expect(label).toHaveClass(classes.label);
  // @ts-ignore
  expect(label).toHaveStyleRule("display", "flex");
  // @ts-ignore
  expect(label).toHaveStyleRule("align-items", "center");
  // @ts-ignore
  expect(label).toHaveStyleRule("justify-content", "center");
  // @ts-ignore
  expect(label).toHaveStyleRule("width", "100%");
});
