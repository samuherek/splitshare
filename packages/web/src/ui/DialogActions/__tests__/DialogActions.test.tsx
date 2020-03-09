import React from "react";
import { render } from "../../../test-utils/test-utils";
import DialogActions from "../DialogActions";

test("<DialogActions /> should match snapshot", () => {
  const { container } = render(<DialogActions>Content</DialogActions>);
  const actions = container.firstChild;
  expect(actions).toMatchSnapshot();
});
