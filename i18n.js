const NextI18Next = require("next-i18next");

const options = {
  defaultLanguage: "en",
  fallbackLng: "en",
  otherLanguages: ["fr"]
};
/**
 * @type {{config: any, i18n: any, appWithTranslation: (...args: any[]) => any, withNamespaces: (...args: any[]) => any, Link: any, Trans: any}}
 */
const nextI18NextInstance = new NextI18Next(options);
module.exports = nextI18NextInstance;
