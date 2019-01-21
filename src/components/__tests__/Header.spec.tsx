import React from "react";
import { render } from "../../testUtils";
import { default as Header } from "../Header";

describe("src/component/Header", () => {
  it("should render", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Home")).toBeTruthy();
  });
});
