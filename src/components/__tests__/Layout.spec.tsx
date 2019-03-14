import React from "react";

import {
  renderI18nNamespacesWrappedComponent,
  withMobxStore
} from "../../testUtils";
import { default as Layout } from "../Layout";
import { i18n } from "../../../i18n";

const makeTestLayoutWithMobx = () => {
  const TestLayout: React.SFC = (props: any) => (
    <Layout {...props}>
      <div>Hello world!</div>
    </Layout>
  );
  return withMobxStore()(TestLayout);
};

describe("src/component/Layout", () => {
  beforeAll(() => {
    i18n.language = "en";
  });
  it("should render", () => {
    const TestLayoutWithMobx = makeTestLayoutWithMobx();
    const { getByText } = renderI18nNamespacesWrappedComponent(
      TestLayoutWithMobx
    );
    expect(getByText("Hello world!")).toBeTruthy();
    // expect(getByText("[common-label-home] (en)")).toBeTruthy();
    // expect(getByText("[common-label-about] (en)")).toBeTruthy();
  });
});
