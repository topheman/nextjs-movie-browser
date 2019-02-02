/**
 * When you choose a language that does not have translations in /static/locales and you reload your page:
 * -> the cookie "i18next=UNSUPPORTED_LANGUAGE_CODE" is replaced by "i18next=en" (if fallbackLng is "en")
 * So you loose the state of this language between refresh.
 *
 * If you want to allow to use unsupported language code (for example because
 * you don't have locale translations, but your content API does)
 *
 * The following Provider expose via the Consumer:
 * - language: the language used for the translations (this one will fallback to fallbackLng on refresh if no translations supported)
 * - languageOverride: format "fr" - this one WON'T fallback to fallbackLng on refresh if no translations supported
 *     -> you can rely on it for language code selection combo box for example
 * - languageOverrideFull: format "fr-FR" or "fr"
 * - switchLanguage(language)
 *
 * Example 1: Supported languages ["en", "fr", "es"] with fallbackLng = "en"
 * - switchLanguage("es-ES")
 * - reload page
 * - document.cookie === "i18next=es; i18nOverride=es; i18nOverrideFull=es-ES"
 * - After reload, the UI and the API content is in spanish
 * - language === "es" / languageOverride === "es" / languageOverrideFullCode === "es-ES"
 *
 * Example 2: Supported languages ["en", "fr"] with fallbackLng = "en"
 * - switchLanguage("es-ES")
 * - reload page
 * - document.cookie === "i18next=en; i18nOverride=es; i18nOverrideFull=es-ES"
 * - After reload, the UI is in english and the API content is in spanish
 * - language === "en" / languageOverride === "es" / languageOverrideFullCode === "es-ES"
 *
 * If you want to use language code like "en-US" in /static/locales, use the second arg of `switchLanguage`
 * `switchLanguage("fr-FR", false)` // won't strip the language code
 */
import i18next from "i18next";
import { Component, createContext } from "react";

import { setLanguageOverrideFromCookie } from "./utils";

// will be executed by default on switchLanguage (you can override it, see bellow)
const updateHtmlLangAttribute = ({
  language
}: ILanguageManagerProviderState) => {
  document.getElementsByTagName("html")[0].lang = language;
};

/**
 * Converts "fr-FR" to "fr"
 * Used by default for switchLanguage (you can override it)
 * See https://developers.themoviedb.org/3/getting-started/languages
 * @param languageCode
 */
const languageCodeToISO6391 = (languageCode: string): string =>
  languageCode.split("-").shift() as string;

export interface ILanguageManagerConsumerProps {
  language: string;
  languageOverride: string;
  languageOverrideFull: string;
  switchLanguage: (
    language: string,
    formatLanguageCode?: (languageCode: string) => string
  ) => void;
}

const LanguageManagerContext = createContext<ILanguageManagerConsumerProps>(
  {} as ILanguageManagerConsumerProps
);

interface ILanguageManagerProviderProps {
  i18n: i18next.i18n;
  languageOverride: string;
  languageOverrideFull: string;
}

interface ILanguageManagerProviderState {
  language: string;
  languageOverride: string;
  languageOverrideFull: string;
}

export class LanguageManagerProvider extends Component<
  ILanguageManagerProviderProps,
  ILanguageManagerProviderState
> {
  constructor(props: ILanguageManagerProviderProps) {
    super(props);
    this.state = {
      language: props.i18n.language,
      languageOverride: props.languageOverride || props.i18n.language,
      languageOverrideFull: props.languageOverrideFull || props.i18n.language
    };
  }
  switchLanguage = (
    language: string,
    formatLanguageCode = languageCodeToISO6391,
    cb = updateHtmlLangAttribute
  ) => {
    const formattedLanguageCode = formatLanguageCode(language);
    setLanguageOverrideFromCookie(formattedLanguageCode);
    setLanguageOverrideFromCookie(language, true);
    this.props.i18n.changeLanguage(formattedLanguageCode);
    this.setState(
      {
        language: formattedLanguageCode,
        languageOverride: formattedLanguageCode,
        languageOverrideFull: language
      },
      () => {
        if (typeof document !== "undefined" && typeof cb === "function") {
          cb({
            language: formattedLanguageCode,
            languageOverride: formattedLanguageCode,
            languageOverrideFull: language
          });
        }
      }
    );
  };
  render() {
    return (
      <LanguageManagerContext.Provider
        value={{
          language: this.state.language,
          languageOverride: this.state.languageOverride,
          languageOverrideFull: this.state.languageOverrideFull,
          switchLanguage: this.switchLanguage
        }}
      >
        {this.props.children}
      </LanguageManagerContext.Provider>
    );
  }
}

export const LanguageManagerConsumer = LanguageManagerContext.Consumer;
