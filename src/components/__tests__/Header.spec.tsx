import React from "react";
import { render } from "../../testUtils";
import { default as Header } from "../Header";

describe.skip("src/component/Header", () => {
  it("should render", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Home")).toBeTruthy();
  });
  it(`should render title "${process.env.NEXTJS_APP_CLIENT_TITLE}"`, () => {
    const { getByText } = render(<Header />);
    expect(getByText(process.env.NEXTJS_APP_CLIENT_TITLE)).toBeTruthy();
  });
});
