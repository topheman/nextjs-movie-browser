"use strict";

const NextI18Next = require("next-i18next");

const DEFAULT_LANGUAGE_FULL_CODE = "en-US";
const DEFAULT_LANGUAGE_SHORT_CODE = "en";

const options = {
  defaultLanguage: DEFAULT_LANGUAGE_SHORT_CODE,
  fallbackLng: DEFAULT_LANGUAGE_SHORT_CODE,
  otherLanguages: ["fr"],
  interpolation: {
    format: function(value, format, lng) {
      if (format === "uppercase") {
        return value.toUpperCase();
      }
      if (format === "currency") {
        return new Intl.NumberFormat(lng).format(Number(value)); // under node 11, only formats in US currency
      }
      if (value instanceof Date) {
        return require("moment")(value).format(format); // @todo use lighter lib than moment
      }
      return value;
    }
  }
};

const nextI18NextInstance = new NextI18Next(options);
module.exports = nextI18NextInstance;

module.exports.DEFAULT_LANGUAGE_FULL_CODE = DEFAULT_LANGUAGE_FULL_CODE;
module.exports.DEFAULT_LANGUAGE_SHORT_CODE = DEFAULT_LANGUAGE_SHORT_CODE;
