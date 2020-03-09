import React from "react";
import { render } from "../../../test-utils/test-utils";
import DialogTitle from "../DialogTitle";

test("<DialogTitle /> should match snpashot", () => {
  const { container } = render(<DialogTitle>Content</DialogTitle>);
  const title = container.firstChild;
  expect(title).toMatchSnapshot();
});
