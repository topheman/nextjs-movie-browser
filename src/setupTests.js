const { loadConfig } = require("../scripts/config/next-env");
const { withNamespacesMock } = require("./services/i18n/NamespaceMock");

// Inject config from .env files into test suite
loadConfig();

/**
 * Gives access to the following jest custom matchers:
 * - toBeInTheDOM
 * - toHaveTextContent
 * - toHaveAttribute
 * - toHaveClass
 *
 * Can also be exposed from "dom-testing-library" via `import "dom-testing-library/extend-expect"`
 */
require("jest-dom/extend-expect");

/**
 * Needed for `renderI18nNamespacesWrappedComponent` from testUtils
 */
jest.mock("react-i18next", () => ({
  // withNamespaces: () => Component => Component
  withNamespaces: withNamespacesMock
}));
