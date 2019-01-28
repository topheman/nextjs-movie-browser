const COOKIE_LANGUAGE_OVERRIDE = "i18nOverride";

/**
 *
 * @type (cookie?: string) => string | null
 */
const getLanguageOverrideFromCookie = cookie => {
  if (cookie) {
    const pattern = new RegExp(
      `${COOKIE_LANGUAGE_OVERRIDE}=([a-zA-Z0-9]*(-[a-zA-Z0-9]*)?)+`
    );
    const match = cookie.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
};

/**
 *
 * @type (languageCode: string) => void
 */
const setLanguageOverrideFromCookie = languageCode => {
  if (typeof window === "undefined") {
    throw new Error("This method is ment to be used only client side");
  }
  document.cookie = `${COOKIE_LANGUAGE_OVERRIDE}=${languageCode}`;
};

module.exports = {
  getLanguageOverrideFromCookie,
  setLanguageOverrideFromCookie
};
