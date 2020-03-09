import React from "react";
import { render } from "../../../test-utils/test-utils";
import Dialog from "../Dialog";

describe("<Dialog />", () => {
  test("should match snapshot", () => {
    render(<Dialog isOpen={true}>button</Dialog>);
    expect(document.body.lastChild).toMatchSnapshot();
  });
});
