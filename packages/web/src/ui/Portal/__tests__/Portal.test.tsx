import React from "react";
import { render } from "../../../test-utils/test-utils";
import Portal from "../Portal";

describe("<Portal />", () => {
  it("should match snapshot", () => {
    render(
      <Portal>
        <div>Foo</div>
      </Portal>
    );
    expect(document.body.lastChild).toMatchSnapshot();
  });
});
