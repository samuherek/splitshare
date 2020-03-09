import React from "react";
import { render } from "../../../test-utils/test-utils";
import Backdrop from "../Backdrop";

describe("<Backdrop />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Backdrop />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
