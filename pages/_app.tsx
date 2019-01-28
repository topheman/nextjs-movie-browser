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
import { getLanguageOverrideFromCookie } from "../src/services/i18n/utils";
import { CustomNextAppContext } from "../src/@types";

const server = typeof window === "undefined"; // accessible sync

initApiClient();

class MyApp extends App<{ languageOverride: string }> {
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

    const languageOverride = getLanguageOverrideFromCookie(
      (ctx.req && ctx.req.headers.cookie) ||
        (typeof "window" !== "undefined" && document && document.cookie)
    );

    // set `languageOverride` as prop of the root page
    let pageProps = { languageOverride };

    if (Component.getInitialProps) {
      // inject `languageOverride` attribute in the params of getInitialProps of the root page
      pageProps = await Component.getInitialProps({ languageOverride, ...ctx });
      // set `languageOverride` as prop of the root page on the object returned by getInitialProps
      pageProps.languageOverride = languageOverride;
    }

    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log(
      "render - languageOverride from pageProps",
      pageProps.languageOverride
    );

    return (
      <Container>
        <LanguageManagerProvider
          i18n={i18n}
          languageOverride={pageProps.languageOverride}
        >
          <LanguageManagerConsumer>
            {({ languageOverride: lang }) => (
              <Component {...pageProps} languageOverride={lang} />
            )}
          </LanguageManagerConsumer>
        </LanguageManagerProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
