import React from "react";
import { render } from "../../testUtils";
import { default as Layout } from "../Layout";

describe("src/component/Layout", () => {
  it("should render", () => {
    const { getByText } = render(
      <Layout>
        <div>Hello world!</div>
      </Layout>
    );
    expect(getByText("Hello world!")).toBeTruthy();
  });
});
