const NextI18Next = require("next-i18next");

const DEFAULT_LANGUAGE_FULL_CODE = "en-US";
const DEFAULT_LANGUAGE_SHORT_CODE = "en";

const options = {
  defaultLanguage: DEFAULT_LANGUAGE_SHORT_CODE,
  fallbackLng: DEFAULT_LANGUAGE_SHORT_CODE,
  otherLanguages: ["fr"]
};
/**
 * @type {{config: any, i18n: any, appWithTranslation: (...args: any[]) => any, withNamespaces: (...args: any[]) => any, Link: any, Trans: any, DEFAULT_LANGUAGE_SHORT_CODE: string, DEFAULT_LANGUAGE_FULL_CODE: string}}
 */
const nextI18NextInstance = new NextI18Next(options);
module.exports = nextI18NextInstance;

module.exports.DEFAULT_LANGUAGE_FULL_CODE = DEFAULT_LANGUAGE_FULL_CODE;
module.exports.DEFAULT_LANGUAGE_SHORT_CODE = DEFAULT_LANGUAGE_SHORT_CODE;
