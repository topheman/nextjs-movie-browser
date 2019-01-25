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
import App, { Container, NextAppContext } from "next/app";

const server = typeof window === "undefined"; // accessible sync

initApiClient();

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: NextAppContext) {
    // const server = !!ctx.req; // only accessible async

    console.log({
      pathname: router.pathname,
      query: JSON.stringify(router.query),
      server
    });

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
