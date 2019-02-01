import {
  renderI18nNamespacesWrappedComponent,
  renderI18nWithLanguageManagerProvider,
  fireEvent,
  cleanup
} from "../../testUtils";
import { default as Header } from "../Header";

describe.only("src/component/Header", () => {
  afterEach(cleanup);
  it(`should render "${process.env.NEXTJS_APP_CLIENT_TITLE}"`, () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(Header);
    expect(getByText(process.env.NEXTJS_APP_CLIENT_TITLE)).toBeTruthy();
  });
  it("should render correct links", () => {
    const { getByText } = renderI18nNamespacesWrappedComponent(Header);
    expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(getByText("[common-label-about] (en)")).toBeTruthy();
  });
  it("should change language UI on select change", async () => {
    const { getByTestId, getByText } = renderI18nWithLanguageManagerProvider(
      Header
    );
    const input = getByTestId("switch-language");
    expect(input).toBeTruthy();
    expect(getByText("[common-label-home] (en)")).toBeTruthy();
    expect(input.value).toBe("en-US");
    fireEvent.change(input, { target: { value: "fr-FR" } });
    expect(input.value).toBe("fr-FR");
    expect(getByText("[common-label-home] (fr)")).toBeTruthy();
  });
});
