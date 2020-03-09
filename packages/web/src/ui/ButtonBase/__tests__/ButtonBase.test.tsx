import { render } from "../../../test-utils/test-utils";
import React from "react";
// import ButtonAdornment from "../../ButtonAdornment";
import ButtonBase from "../ButtonBase";

test("should match snapshots", () => {
  const emptyButton = render(<ButtonBase />);
  expect(emptyButton.container.firstChild).toMatchSnapshot();

  const textButton = render(<ButtonBase>Button</ButtonBase>);
  expect(textButton.container.firstChild).toMatchSnapshot();
});

test("should apply default styles", () => {
  const { container } = render(<ButtonBase />);
  const button = container.firstChild;
  // @ts-ignore
  expect(button).toHaveStyleRule("color", "inherit");
  // @ts-ignore
  expect(button).toHaveStyleRule("cursor", "pointer");
  // @ts-ignore
  expect(button).toHaveStyleRule("margin", "0");
  // @ts-ignore
  expect(button).toHaveStyleRule("padding", "0");
  // @ts-ignore
  expect(button).toHaveStyleRule("border", "0");
  // @ts-ignore
  expect(button).toHaveStyleRule("font", "inherit");
  // @ts-ignore
  expect(button).toHaveStyleRule("font", "inherit");
  // @ts-ignore
  expect(button).toHaveStyleRule("cursor", "pointer");
  // @ts-ignore
  expect(button).not.toHaveStyleRule("opacity");
});

test("should change the button type", () => {
  const { getByText } = render(<ButtonBase type="submit">Button</ButtonBase>);
  expect(getByText(/button/i)).toHaveProperty("type", "submit");
});

test("should change the button component and add accessibility requirements", () => {
  const { getByRole } = render(
    <ButtonBase component="span" role="checkbox" aria-checked={false} />
  );
  const checkbox = getByRole("checkbox");
  expect(checkbox).toHaveProperty("nodeName", "SPAN");
  expect(checkbox).toHaveProperty("tabIndex", 0);
});

test('should not apply role="button" if type="button"', () => {
  const { getByText } = render(<ButtonBase type="button">Button</ButtonBase>);
  expect(getByText(/button/i)).not.toHaveAttribute("role");
});

test("should automatically change the button to an anochr element when href is provided", () => {
  const href = "https://google.com";
  const { getByText } = render(<ButtonBase href={href}>Button</ButtonBase>);
  const button = getByText(/button/i);

  expect(button).toHaveProperty("nodeName", "A");
  expect(button).not.toHaveProperty("role");
  expect(button).toHaveAttribute("href", href);
});

test('applies role="button" when an anchor is used without href', () => {
  const { getByRole } = render(<ButtonBase component="a">Button</ButtonBase>);
  const button = getByRole("button");

  expect(button).toHaveProperty("nodeName", "A");
  expect(button).not.toHaveAttribute("type");
});

test("should not use an anchor element if explicit component and href is passed", () => {
  const href = "https://google.com";
  const { getByRole } = render(
    <ButtonBase component="span" href={href}>
      Button
    </ButtonBase>
  );
  const button = getByRole("button");

  expect(button).toHaveProperty("nodeName", "SPAN");
  expect(button).toHaveAttribute("href", href);
});

// test('should use react router <Link /> component if provided "to"', () => {
//   const path = '/';
//   const { getByText } = render(
//     withRouter(<ButtonBase to={path}>Button</ButtonBase>)
//   );
//   const button = getByText(/button/i);

//   expect(button).toHaveProperty('nodeName', 'A');
//   expect(button).toHaveAttribute('href', path);
// });

test("prop: disabled -> should have disabled styles", () => {
  const { getByText } = render(<ButtonBase disabled>Button</ButtonBase>);
  const button = getByText(/button/i);

  // @ts-ignore
  expect(button).toHaveStyleRule("cursor", "default", {
    modifier: ":disabled"
  });
  // @ts-ignore
  expect(button).toHaveStyleRule("pointer-events", "none", {
    modifier: ":disabled"
  });
});

test("prop: disabled -> should have a negative tabIndex", () => {
  const { getByText } = render(<ButtonBase disabled>Button</ButtonBase>);
  expect(getByText(/button/i)).toHaveProperty("tabIndex", -1);
});

test("prop: disabled -> should forward it to native buttons", () => {
  const { getByText } = render(
    <ButtonBase disabled component="button">
      Button
    </ButtonBase>
  );
  expect(getByText(/button/i)).toHaveProperty("disabled", true);
});

test("prop: disabled -> should use aria attributes for other components", () => {
  const { getByRole } = render(
    <ButtonBase component="span" disabled>
      Button
    </ButtonBase>
  );
  const button = getByRole("button");
  expect(button).not.toHaveAttribute("disabled");
  expect(button).toHaveAttribute("aria-disabled", "true");
});

// test("prop: startAdornment and endAdornment should match snapshots", () => {
//   const start = render(
//     <ButtonBase
//       placeholder="Start"
//       startAdornment={<ButtonAdornment position="start">Kg</ButtonAdornment>}
//     />
//   );

//   expect(start.container.firstChild).toMatchSnapshot();

//   const end = render(
//     <ButtonBase
//       placeholder="End"
//       endAdornment={<ButtonAdornment position="end">Kg</ButtonAdornment>}
//     />
//   );

//   expect(end.container.firstChild).toMatchSnapshot();

//   const startEnd = render(
//     <ButtonBase
//       placeholder="Start and End"
//       startAdornment={<ButtonAdornment position="start">Kg</ButtonAdornment>}
//       endAdornment={<ButtonAdornment position="end">Kg</ButtonAdornment>}
//     />
//   );

//   expect(startEnd.container.firstChild).toMatchSnapshot();
// });

// test("prop: startAdornment should render adornment", () => {
//   const { getByText } = render(
//     <ButtonBase
//       placeholder="Start"
//       startAdornment={<ButtonAdornment position="start">Kg</ButtonAdornment>}
//     />
//   );
//   expect(getByText(/kg/i)).toBeDefined();
// });

// test("prop: endAdornment should render adornment", () => {
//   const { getByText } = render(
//     <ButtonBase
//       placeholder="End"
//       endAdornment={<ButtonAdornment position="end">Kg</ButtonAdornment>}
//     />
//   );
//   expect(getByText(/kg/i)).toBeDefined();
// });
