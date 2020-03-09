import React from "react";
import { render } from "../../../test-utils/test-utils";
import Modal from "../Modal";

describe("<Modal />", () => {
  test("should match snapshot", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <span>something</span>
      </Modal>
    );
    expect(document.body.lastChild).toMatchSnapshot();
  });
});
