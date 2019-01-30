import { renderI18nNamespacesWrappedComponent } from "../../testUtils";
import { default as Header } from "../Header";

describe("src/component/Header", () => {
  it(`should render "${process.env.NEXTJS_APP_CLIENT_TITLE}"`, () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(Header);
    expect(getByText(process.env.NEXTJS_APP_CLIENT_TITLE)).toBeTruthy();
  });
  it("should render correct links", () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(Header);
    expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(getByText("[common-label-about] (en)")).toBeTruthy();
  });
});
