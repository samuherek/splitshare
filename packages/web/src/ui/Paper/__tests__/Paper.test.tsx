import React from "react";
import { render } from "../../../test-utils/test-utils";
import Paper from "../Paper";

test("should match snapshots", () => {
  const { container } = render(<Paper />);
  expect(container.firstChild).toMatchSnapshot();
});
