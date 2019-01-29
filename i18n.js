const NextI18Next = require("next-i18next");

const DEFAULT_LANGUAGE_FULL = "en-US";
const DEFAULT_LANGUAGE = "en";

const options = {
  defaultLanguage: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  otherLanguages: ["fr"]
};
/**
 * @type {{config: any, i18n: any, appWithTranslation: (...args: any[]) => any, withNamespaces: (...args: any[]) => any, Link: any, Trans: any, DEFAULT_LANGUAGE: string, DEFAULT_LANGUAGE_FULL: string}}
 */
const nextI18NextInstance = new NextI18Next(options);
module.exports = nextI18NextInstance;

module.exports.DEFAULT_LANGUAGE_FULL = DEFAULT_LANGUAGE_FULL;
module.exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
