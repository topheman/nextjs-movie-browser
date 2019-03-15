import {
  renderI18nNamespacesWrappedComponent,
  renderI18nWithLanguageManagerProvider,
  fireEvent,
  cleanup,
  withMobxStore
} from "../../testUtils";
import { default as Header } from "../Header";

const HeaderWithMobx = withMobxStore()(Header);

describe("src/component/Header", () => {
  afterEach(cleanup);
  it(`should render "${process.env.NEXTJS_APP_CLIENT_TITLE}"`, () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(HeaderWithMobx);
    expect(
      getByText(new RegExp(process.env.NEXTJS_APP_CLIENT_TITLE))
    ).toBeTruthy();
  });
  it.skip("should render correct links", () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(HeaderWithMobx);
    expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(getByText("[common-label-about] (en)")).toBeTruthy();
  });
  it("should render with className passed down", () => {
    const { container } = renderI18nNamespacesWrappedComponent(() => (
      <HeaderWithMobx className="hello-world" />
    ));
    expect(container.firstChild.className).toContain("hello-world");
  });
  it("should render with className passed down", () => {
    const { getByTestId } = renderI18nNamespacesWrappedComponent(() => (
      <HeaderWithMobx data-testid="internal-test-id-that-should-flow-down" />
    ));
    expect(getByTestId("internal-test-id-that-should-flow-down")).toBeTruthy();
  });
  it("should change default language UI on select change", async () => {
    const { getByTestId, getByText } = renderI18nWithLanguageManagerProvider(
      HeaderWithMobx
    );
    const input = getByTestId("switch-default-language");
    expect(input).toBeTruthy();
    // expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(input.value).toBe("en-US");
    fireEvent.change(input, { target: { value: "fr-FR" } });
    expect(input.value).toBe("fr-FR");
    // expect(getByText("[common-label-home] (fr)")).toBeTruthy();
  });
});
