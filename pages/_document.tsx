// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";

import { getDefaultLanguageFromCookie } from "../src/services/i18n/utils";
import { getBasePath } from "../src/utils/url";
import DocumentLinkTags from "../src/components/DocumentLinkTags";

export default class MyDocument extends Document<{
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
  basePath: string;
}> {
  static async getInitialProps(ctx: NextDocumentContext) {
    console.log("MyDocument.getInitialProps");
    const initialProps = await Document.getInitialProps(ctx);
    const defaultLanguageShortCode = getDefaultLanguageFromCookie(
      ctx.req && ctx.req.headers.cookie
    );
    const defaultLanguageFullCode = getDefaultLanguageFromCookie(
      ctx.req && ctx.req.headers.cookie,
      true
    );
    return {
      ...initialProps,
      defaultLanguageShortCode,
      defaultLanguageFullCode,
      basePath: getBasePath(ctx.req as any, undefined)
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
          </Head>
          <DocumentLinkTags />
          <body className="custom_class">
            <Main />
            <div id="modal" />
            <NextScript />
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
