/**
 * Using next-i18next,
 * - your root component is wrapped in `appWithTranslation` which will
 * pass via context the i18n instance.
 * - your pages/leaf component that use the `t` (translate) function will be wrapped in `withNamespaces`
 *
 * Bellow:
 * - `appWithTranslationMock` to wrapp the component you test. This will:
 *   - expose the `i18n` instance and make it available to `withNamespacesMock`
 * - `withNamespacesMock` to mock `withNamespaces` via `jest.mock`
 *   - accesses the `i18n` instance passed by `appWithTranslationMock`
 *   - exposes to children an overriden `t` function
 *
 * Simply use the util `renderI18nNamespacesWrappedComponent` in `testUtils` which sets it all together
 */

import { createContext, forwardRef } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

interface INamespaceMockContext {
  i18n: any;
  defaultNS: string;
  initialLanguage: string;
}

const Context = createContext<INamespaceMockContext>(
  {} as INamespaceMockContext
);

export const appWithTranslationMock = (
  Comp: any,
  { i18n, defaultNS = "common", initialLanguage = "en" }: INamespaceMockContext
) => {
  const Wrapper = (props: any) => (
    <Context.Provider value={{ i18n, defaultNS, initialLanguage }}>
      <Comp {...props} />
    </Context.Provider>
  );

  Wrapper.displayName = `appWithTranslationMock(${Comp.displayName ||
    Comp.name ||
    "Component"})`;
  const WrapperWithRef = forwardRef((props, ref) => (
    <Wrapper innerRef={ref} {...props} />
  ));
  // @ts-ignore
  WrapperWithRef.WrappedComponent = Comp;
  return hoistNonReactStatics(WrapperWithRef, Comp, { getInitialProps: true });
};

export const withNamespacesMock = () => (Comp: any) => {
  const Wrapper = (props: any) => {
    return (
      <Context.Consumer>
        {translateContext => {
          // override `t` method
          const t = (code: string) =>
            `[${code}] (${translateContext.i18n.language})`;
          const alteredProps = {
            t
          };
          return <Comp {...props} {...alteredProps} />;
        }}
      </Context.Consumer>
    );
  };

  Wrapper.displayName = `withNamespacesMock(${Comp.displayName ||
    Comp.name ||
    "Component"})`;
  const WrapperWithRef = forwardRef((props, ref) => (
    <Wrapper innerRef={ref} {...props} />
  ));
  // @ts-ignore
  WrapperWithRef.WrappedComponent = Comp;
  return hoistNonReactStatics(WrapperWithRef, Comp, { getInitialProps: true });
};
