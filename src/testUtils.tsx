import React from "react";
import { render } from "react-testing-library";

import { appWithTranslationMock } from "./services/i18n/NamespaceMock";
import { i18n as i18nInstance } from "../i18n";

/**
 * ⚠️ This is a hack, the other import ways don't work (how does `next-i18next` manages it internally ?... It's the same code ...):
 * Won't work:
 * - import { I18nextProvider } from "react-i18next";
 * - const I18nextProvider = require("react-i18next").I18nextProvider;
 */
const I18nextProvider = require("../node_modules/react-i18next/dist/commonjs/I18nextProvider")
  .I18nextProvider;

export {
  wait,
  waitForElement,
  render,
  cleanup,
  fireEvent
} from "react-testing-library";

/**
 * If your component is wrapped in `withNamespaces` and uses the `t` prop,
 * we need to mock it - see `src/services/i18n/NamespaceMock`
 * 
 * MAKE sure you mocked withNamespaces in the setup of the tests (setupTests.js):
 * 
```
const { withNamespacesMock } = require("./services/i18n/NamespaceMock");

jest.mock("react-i18next", () => ({
  withNamespaces: () => Component => Component
}));
```
 * @param ui 
 * @param renderOptions 
 */
export const renderI18nNamespacesWrappedComponent = (
  Comp: React.Component,
  renderOptions = {},
  { i18n = i18nInstance, defaultNS = "common", initialLanguage = "en" } = {}
) => {
  i18n.language = initialLanguage;
  const DecoratedWithTranslation = appWithTranslationMock(Comp, {
    i18n: i18nInstance,
    defaultNS,
    initialLanguage
  });
  return render(
    <I18nextProvider i18n={i18n} defaultNS="common" initialLanguage={"en"}>
      <DecoratedWithTranslation />
    </I18nextProvider>,
    renderOptions
  );
};
