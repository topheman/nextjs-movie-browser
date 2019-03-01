"use strict";

const COOKIE_DEFAULT_LANGUAGE_SHORT_CODE = "i18nDefaultLanguageShortCode";
const COOKIE_DEFAULT_LANGUAGE_FULL_CODE = "i18nDefaultLanguageFullCode";

const getDefaultLanguageFromCookie = (cookie, full = false) => {
  if (cookie) {
    const pattern = new RegExp(
      `${
        full
          ? COOKIE_DEFAULT_LANGUAGE_FULL_CODE
          : COOKIE_DEFAULT_LANGUAGE_SHORT_CODE
      }=([a-zA-Z0-9]*(-[a-zA-Z0-9]*)?)+`
    );
    const match = cookie.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
};

const setDefaultLanguageFromCookie = (languageCode, full = false) => {
  if (typeof window === "undefined") {
    throw new Error("This method is ment to be used only client side");
  }
  document.cookie = `${
    full
      ? COOKIE_DEFAULT_LANGUAGE_FULL_CODE
      : COOKIE_DEFAULT_LANGUAGE_SHORT_CODE
  }=${languageCode}; path=/`;
};

const languageManagerMiddleware = ({
  defaultLanguageShortCode,
  defaultLanguageFullCode
}) => (req, res, next) => {
  /**
   * At the very first visit, force default language, set the custom cookies
   * that will be used by the LanguageManager
   */
  if (!req.cookies.i18nDefaultLanguageShortCode) {
    req.lng = defaultLanguageShortCode;
    res.cookie("i18nDefaultLanguageShortCode", defaultLanguageShortCode);
    res.cookie("i18nDefaultLanguageFullCode", defaultLanguageFullCode);
  }
  return next();
};

module.exports = {
  getDefaultLanguageFromCookie,
  setDefaultLanguageFromCookie,
  languageManagerMiddleware
};
