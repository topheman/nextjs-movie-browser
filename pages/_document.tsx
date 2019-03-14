// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";
import { ServerStyleSheet } from "styled-components";

import { getDefaultLanguageFromCookie } from "../src/services/i18n/utils";
import { getBasePath } from "../src/utils/url";
import DocumentLinkTags from "../src/components/DocumentLinkTags";

export default class MyDocument extends Document<{
  isProduction: boolean;
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
  basePath: string;
}> {
  static async getInitialProps(ctx: NextDocumentContext) {
    console.log("MyDocument.getInitialProps");
    const isProduction = process.env.NODE_ENV === "production";
    const defaultLanguageShortCode = getDefaultLanguageFromCookie(
      ctx.req && ctx.req.headers.cookie
    );
    const defaultLanguageFullCode = getDefaultLanguageFromCookie(
      ctx.req && ctx.req.headers.cookie,
      true
    );
    const basePath = getBasePath(ctx.req as any, undefined);

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        isProduction,
        defaultLanguageShortCode,
        defaultLanguageFullCode,
        basePath,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  // Function will be called below to inject
  // script contents onto page
  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        if (location.hostname !== "localhost") {
          gtag('js', new Date());
          gtag('config', '${
            process.env.NEXTJS_APP_CLIENT_GOOGLE_ANALYTICS_ID
          }');
        }
      `
    };
  }

  /**
   * Specify `lang` attribute on the root html tag on SSR, for SEO
   *
   * This `lang` attribute will be updated client-side when language is changed
   * to help language browser detection language - see src/services/i18n/LanguageManager
   */
  render() {
    return (
      <>
        <html lang={this.props.defaultLanguageShortCode}>
          <Head>
            <style>{`/* custom! */`}</style>
            <meta
              name="viewport"
              content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=yes"
              key="viewport"
            />
          </Head>
          <DocumentLinkTags />
          <body className="custom_class">
            <Main />
            <div id="modal" />
            <NextScript />
            {this.props.isProduction && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${
                    process.env.NEXTJS_APP_CLIENT_GOOGLE_ANALYTICS_ID
                  }`}
                />
                <script dangerouslySetInnerHTML={this.setGoogleTags()} />
              </>
            )}
          </body>
        </html>
        <script
          dangerouslySetInnerHTML={{
            __html: `/*${process.env.NEXTJS_APP_CLIENT_BANNER_HTML}*/`
          }}
        />
      </>
    );
  }
}
