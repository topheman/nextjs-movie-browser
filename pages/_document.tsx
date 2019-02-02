// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";

import { getLanguageOverrideFromCookie } from "../src/services/i18n/utils";

export default class MyDocument extends Document<{
  languageOverride: string;
  languageOverrideFull: string;
}> {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const languageOverride = getLanguageOverrideFromCookie(
      ctx.req && ctx.req.headers.cookie
    );
    const languageOverrideFull = getLanguageOverrideFromCookie(
      ctx.req && ctx.req.headers.cookie,
      true
    );
    return { ...initialProps, languageOverride, languageOverrideFull };
  }

  /**
   * Specify `lang` attribute on the root html tag on SSR, for SEO
   *
   * This `lang` attribute will be updated client-side when language is changed
   * to help language browser detection language - see src/services/i18n/LanguageManager
   */
  render() {
    return (
      <html lang={this.props.languageOverride}>
        <Head>
          <style>{`/* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
