import React from "react";
import { render } from "../../../test-utils/test-utils";
import DialogContent from "../DialogContent";

test("<DialogContent /> should match snapshot", () => {
  const { container } = render(<DialogContent>Content</DialogContent>);
  const content = container.firstChild;
  expect(content).toMatchSnapshot();
});
