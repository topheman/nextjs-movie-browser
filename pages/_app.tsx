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

import App from "next/app"; // using `CustomNextApp` bellow (for types)
import { Container } from "next/app";
import { Provider as MobxProvider } from "mobx-react";
import Router, { RouterProps } from "next/router";
import { NextComponentType } from "next";

import { init as initApiClient } from "../src/services/apis";
import {
  appWithTranslation,
  i18n,
  DEFAULT_LANGUAGE_FULL_CODE,
  DEFAULT_LANGUAGE_SHORT_CODE
} from "../i18n";
import {
  LanguageManagerProvider,
  LanguageManagerConsumer
} from "../src/services/i18n/LanguageManager";
import { getDefaultLanguageFromCookie } from "../src/services/i18n/utils";
import { createStore, MyMobxStore } from "../src/stores";
import { CustomNextAppContext } from "../src/@types";
import { getBasePath } from "../src/utils/url";

const server = typeof window === "undefined"; // accessible sync

initApiClient();

class MyApp extends App {
  mobxStore: MyMobxStore;
  /**
   * The constructor runs first when client-side (it will rely on serialized data shipped with the ssr rendered html)
   * Example client-side:
   * - MyApp.constructor
   * - MyApp.render
   * - Page.render
   *
   * The getInitialProps methods are invoke first server side (they are async, like a server request)
   * Exemple server-side:
   * - MyApp.getInitialProps
   * - Page.getInitialProps
   * - MyApp.constructor
   * - MyApp.render
   * - Page.render
   *
   * For the initial page load, getInitialProps will execute on the server only.
   * getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.
   * https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle
   *
   */
  constructor(props: {
    Component: NextComponentType;
    router: RouterProps;
    pageProps: any;
  }) {
    super(props);
    // logging the following env vars (generated at build time, then re-used at runtime whatever client or server side)
    console.log("MyApp.constructor", {
      RECORD_MOCKS: process.env.RECORD_MOCKS,
      MOCKS_ENABLED: process.env.MOCKS_ENABLED,
      NEXTJS_APP_CLIENT_BASE_PATH: process.env.NEXTJS_APP_CLIENT_BASE_PATH
    });
    this.mobxStore = server
      ? props.pageProps.initialMobxState // creates store server-side based on the mobx store returned by MyApp.getInitialProps
      : createStore(props.pageProps.initialMobxState); // creates store client-side based on serialized store with hydrated data
  }

  static async getInitialProps({
    Component,
    router,
    ctx
  }: CustomNextAppContext) {
    console.log("App.getInitialProps");

    const translationLanguageFullCode =
      router.query.translationLanguageFullCode;

    const defaultLanguageShortCode =
      getDefaultLanguageFromCookie(
        (ctx.req && ctx.req.headers.cookie) ||
          (typeof "window" !== "undefined" &&
            typeof document !== "undefined" &&
            document.cookie)
      ) || DEFAULT_LANGUAGE_SHORT_CODE;

    const defaultLanguageFullCode =
      getDefaultLanguageFromCookie(
        (ctx.req && ctx.req.headers.cookie) ||
          (typeof "window" !== "undefined" &&
            typeof document !== "undefined" &&
            document.cookie),
        true
      ) || DEFAULT_LANGUAGE_FULL_CODE;

    // create a store with the initial state
    const mobxStore = createStore();
    // expose store to getInitialProps of pages to prepare the store with different data
    // that will be injected via ssr
    ctx.mobxStore = mobxStore;

    // console.log({
    //   pathname: router.pathname,
    //   query: JSON.stringify(router.query),
    //   server,
    //   language: i18n.language,
    //   defaultLanguageShortCode,
    //   defaultLanguageFullCode,
    //   translationLanguageFullCode,
    //   router,
    //   req: ctx.req,
    //   basePath: getBasePath(
    //     ctx.req,
    //     typeof location !== "undefined" ? location : undefined
    //   )
    // });

    const basePageProps = {
      basePath: getBasePath(
        ctx.req,
        typeof location !== "undefined" ? location : undefined
      ),
      initialMobxState: mobxStore, // store that will be serialized for ssr (see constructor)
      translationLanguageFullCode,
      defaultLanguageShortCode,
      defaultLanguageFullCode
    };
    let pageProps = {
      ...basePageProps
    };

    if (Component.getInitialProps) {
      // inject the basePageProps in the parameters of getInitialProps
      pageProps = await Component.getInitialProps({
        ...basePageProps,
        ...ctx // contains the mobxStore (see above)
      });
      // return the basePageProps inside the pageProps
      pageProps = {
        ...basePageProps,
        ...pageProps
      };
    }

    return {
      pageProps
    };
  }

  /**
   * Manage loading state of the router
   */
  onRouteChangeStart = (url: string) => {
    console.log(`router`, `Loading: ${url}`);
    this.mobxStore &&
      this.mobxStore.uiStore &&
      this.mobxStore.uiStore.setLoadingState({ loading: true });
  };
  onRouteChangeComplete = (url: string) => {
    console.log(`router`, `Complete: ${url}`);
    this.mobxStore &&
      this.mobxStore.uiStore &&
      this.mobxStore.uiStore.setLoadingState({ loading: false });
  };
  onRouteChangeError = (err: any, url: string) => {
    console.log(`router`, `Error: ${url} / ${err.message}`, err);
    this.mobxStore &&
      this.mobxStore.uiStore &&
      this.mobxStore.uiStore.setLoadingState({ loading: false });
  };
  componentDidMount() {
    console.log("App.componentDidMount");
    Router.events.on("routeChangeStart", this.onRouteChangeStart);
    Router.events.on("routeChangeComplete", this.onRouteChangeComplete);
    Router.events.on("routeChangeError", this.onRouteChangeError);
  }

  render() {
    console.log("App.render");
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
        <MobxProvider {...this.mobxStore}>
          <LanguageManagerProvider
            i18n={i18n}
            defaultLanguageShortCode={pageProps.defaultLanguageShortCode}
            defaultLanguageFullCode={pageProps.defaultLanguageFullCode}
          >
            <LanguageManagerConsumer>
              {({
                translationLanguageFullCode: translationLangFullCode,
                defaultLanguageShortCode: defaultLangShortCode,
                defaultLanguageFullCode: defaultLangFullCode
              }) => (
                <Component
                  {...pageProps}
                  translationLanguageFullCode={translationLangFullCode}
                  defaultLanguageShortCode={defaultLangShortCode}
                  defaultLanguageFullCode={defaultLangFullCode}
                />
              )}
            </LanguageManagerConsumer>
          </LanguageManagerProvider>
        </MobxProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
