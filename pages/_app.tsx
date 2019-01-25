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

import "isomorphic-fetch";
import App, { Container, NextAppContext } from "next/app";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: NextAppContext) {
    const server = !!ctx.req;
    let pageProps = {};

    console.log({ server, routerPopulated: !!router });

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
