/**
 * "Next.js uses the App component to initialize pages.
 * You can override it and control the page initialization."
 *
 * https://nextjs.org/docs/#custom-app
 *
 * Use this class to:
 * - launch init function before app start
 * - wrap the global render function with your Providers
 */

import { init as initApiClient } from "../src/services/apis";
import App, { Container } from "next/app";

import { appWithTranslation, i18n } from "../i18n";
import {
  LanguageManagerProvider,
  LanguageManagerConsumer
} from "../src/services/i18n/LanguageManager";
import { getDefaultLanguageFromCookie } from "../src/services/i18n/utils";
import { CustomNextAppContext } from "../src/@types";

const server = typeof window === "undefined"; // accessible sync

initApiClient();

class MyApp extends App<{
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
}> {
  static async getInitialProps({
    Component,
    router,
    ctx
  }: CustomNextAppContext) {
    // const server = !!ctx.req; // only accessible async

    console.log({
      pathname: router.pathname,
      query: JSON.stringify(router.query),
      server,
      language: i18n.language
    });

    const defaultLanguageShortCode =
      getDefaultLanguageFromCookie(
        (ctx.req && ctx.req.headers.cookie) ||
          (typeof "window" !== "undefined" &&
            typeof document !== "undefined" &&
            document.cookie)
      ) || i18n.options.defaultLanguage;

    const defaultLanguageFullCode =
      getDefaultLanguageFromCookie(
        (ctx.req && ctx.req.headers.cookie) ||
          (typeof "window" !== "undefined" &&
            typeof document !== "undefined" &&
            document.cookie),
        true
      ) || i18n.options.defaultLanguage;

    console.log({
      language: i18n.language,
      defaultLanguageShortCode,
      defaultLanguageFullCode
    });

    // set `defaultLanguageShortCode` as prop of the root page
    let pageProps = { defaultLanguageShortCode, defaultLanguageFullCode };

    if (Component.getInitialProps) {
      // inject `defaultLanguageShortCode` attribute in the params of getInitialProps of the root page
      pageProps = await Component.getInitialProps({
        defaultLanguageShortCode,
        defaultLanguageFullCode,
        ...ctx
      });
      // set `defaultLanguageShortCode` as prop of the root page on the object returned by getInitialProps
      pageProps.defaultLanguageShortCode = defaultLanguageShortCode;
      pageProps.defaultLanguageFullCode = defaultLanguageFullCode;
    }

    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    /**
     * The LanguageManagerProvider will allow any Component deep in the tree to connect with
     * LanguageManagerConsumer, in order to access:
     * language, defaultLanguageShortCode, defaultLanguageFullCode and switchLanguage
     *
     * The LanguageManagerConsumer just bellow is there in order to force the tree to re-render
     * when switchLanguage is called
     */
    return (
      <Container>
        <LanguageManagerProvider
          i18n={i18n}
          defaultLanguageShortCode={pageProps.defaultLanguageShortCode}
          defaultLanguageFullCode={pageProps.defaultLanguageFullCode}
        >
          <LanguageManagerConsumer>
            {({
              defaultLanguageShortCode: defaultLangShortCode,
              defaultLanguageFullCode: defaultLangFullCode
            }) => (
              <Component
                {...pageProps}
                defaultLanguageShortCode={defaultLangShortCode}
                defaultLanguageFullCode={defaultLangFullCode}
              />
            )}
          </LanguageManagerConsumer>
        </LanguageManagerProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
