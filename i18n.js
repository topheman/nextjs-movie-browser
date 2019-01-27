const NextI18Next = require("next-i18next");

const options = {
  defaultLanguage: "en",
  fallbackLng: "en",
  otherLanguages: ["fr"]
};
/**
 * @type {{config: any, i18n: any, appWithTranslation: (...args: any[]) => any, withNamespaces: (...args: any[]) => any, Link: any, Trans: any, retrieveLanguageFromPageProps: (...args: any[]) => string}}
 */
const nextI18NextInstance = new NextI18Next(options);
module.exports = nextI18NextInstance;

/**
 * Call this function on pages in getInitialProps to retrieve the language.
 * Will handle server/client
 */
module.exports.retrieveLanguageFromPageProps = props => {
  // server side
  if (props.req) {
    return props.req.i18n.language;
  }
  // client side
  return nextI18NextInstance.i18n.language;
};
