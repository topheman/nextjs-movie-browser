import React, { Component } from "react";
import { renderI18nNamespacesWrappedComponent } from "../../testUtils";
import { default as Layout } from "../Layout";

import { i18n } from "../../../i18n";

describe("src/component/Layout", () => {
  beforeAll(() => {
    i18n.language = "en";
  });
  it("should render", () => {
    const TestLayout: React.SFC = (props: any) => (
      <Layout {...props}>
        <div>Hello world!</div>
      </Layout>
    );
    const { getByText } = renderI18nNamespacesWrappedComponent(TestLayout);
    expect(getByText("Hello world!")).toBeTruthy();
    expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(getByText("[common-label-about] (en)")).toBeTruthy();
  });
});
