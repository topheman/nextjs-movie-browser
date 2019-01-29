const COOKIE_LANGUAGE_OVERRIDE = "i18nOverride";
const COOKIE_LANGUAGE_OVERRIDE_FULL = "i18nOverrideFull";

/**
 *
 * @type (cookie?: string, full?: boolean) => string | null
 */
const getLanguageOverrideFromCookie = (cookie, full = false) => {
  if (cookie) {
    const pattern = new RegExp(
      `${
        full ? COOKIE_LANGUAGE_OVERRIDE_FULL : COOKIE_LANGUAGE_OVERRIDE
      }=([a-zA-Z0-9]*(-[a-zA-Z0-9]*)?)+`
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
 * @type (languageCode: string, full?: boolean) => void
 */
const setLanguageOverrideFromCookie = (languageCode, full = false) => {
  if (typeof window === "undefined") {
    throw new Error("This method is ment to be used only client side");
  }
  document.cookie = `${
    full ? COOKIE_LANGUAGE_OVERRIDE_FULL : COOKIE_LANGUAGE_OVERRIDE
  }=${languageCode}`;
};

module.exports = {
  getLanguageOverrideFromCookie,
  setLanguageOverrideFromCookie
};
