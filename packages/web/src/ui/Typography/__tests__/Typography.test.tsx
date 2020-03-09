import React from "react";
import { render } from "../../../test-utils/test-utils";
import Typography, { classes } from "../Typography";

test("should match snapshots", () => {
  const emptyTypography = render(<Typography />);
  expect(emptyTypography.container.firstChild).toMatchSnapshot();

  const textTypography = render(<Typography>Text</Typography>);
  expect(textTypography.container.firstChild).toMatchSnapshot();

  const h1Variant = render(<Typography variant="h1" />);
  expect(h1Variant.container.firstChild).toMatchSnapshot();

  const h2Variant = render(<Typography variant="h2" />);
  expect(h2Variant.container.firstChild).toMatchSnapshot();

  const h3Variant = render(<Typography variant="h3" />);
  expect(h3Variant.container.firstChild).toMatchSnapshot();

  const h4Variant = render(<Typography variant="h4" />);
  expect(h4Variant.container.firstChild).toMatchSnapshot();

  const h5Variant = render(<Typography variant="h5" />);
  expect(h5Variant.container.firstChild).toMatchSnapshot();

  const paragraphVariant = render(<Typography variant="paragraph" />);
  expect(paragraphVariant.container.firstChild).toMatchSnapshot();

  const subtitleVariant = render(<Typography variant="subtitle" />);
  expect(subtitleVariant.container.firstChild).toMatchSnapshot();

  const titleCardVariant = render(<Typography variant="titleCard" />);
  expect(titleCardVariant.container.firstChild).toMatchSnapshot();

  const titleGroupVariant = render(<Typography variant="titleGroup" />);
  expect(titleGroupVariant.container.firstChild).toMatchSnapshot();
});

it("should render the base styles and classes", () => {
  const { container } = render(<Typography />);
  const typography = container.firstChild;

  expect(typography).toHaveClass(classes.root);
  // @ts-ignore
  expect(typography).toHaveStyleRule("display", "block");
  // @ts-ignore
  expect(typography).toHaveStyleRule("word-wrap", "normal");
  // @ts-ignore
  expect(typography).toHaveStyleRule("font-weight", "normal");
  // @ts-ignore
  expect(typography).toHaveStyleRule("line-height", "1.43");
  // @ts-ignore
  expect(typography).toHaveStyleRule("max-width", "100%");
  // @ts-ignore
  expect(typography).toHaveStyleRule("overflow", "hidden");
  // @ts-ignore
  expect(typography).toHaveStyleRule("text-overflow", "ellipsis");
  // @ts-ignore
  expect(typography).toHaveStyleRule("white-space", "nowrap");
  // @ts-ignore
  expect(typography).not.toHaveStyleRule("opacity");
});

it('prop: "withEllipsis" set to false should remove ellipsis styles', () => {
  const { container } = render(<Typography withEllipsis={false} />);
  const typography = container.firstChild;

  // @ts-ignore
  expect(typography).not.toHaveStyleRule("max-width");
  // @ts-ignore
  expect(typography).not.toHaveStyleRule("overflow");
  // @ts-ignore
  expect(typography).not.toHaveStyleRule("text-overflow");
  // @ts-ignore
  expect(typography).not.toHaveStyleRule("white-space");
});
