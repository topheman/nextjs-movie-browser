/**
 * When you choose a language that does not have translations in /static/locales and you reload your page:
 * -> the cookie "i18next=UNSUPPORTED_LANGUAGE_CODE" is replaced by "i18next=en" (if fallbackLng is "en")
 * So you loose the state of this language between refresh.
 *
 * If you want to allow to use unsupported language code (for example because
 * you don't have locale translations, but your content API does)
 *
 * The following Provider exposes via the Consumer:
 * - `language`: the language used for the translations (this one will fallback to `fallbackLng` on refresh if no translations supported)
 * - `defaultLanguageShortCode`: format "fr" - persists between refreshes (stored in cookie), wont fallback on `fallbackLng`
 * - `defaultLanguageFullCode`: format "fr-FR" or "fr"
 * - `switchDefaultLanguage(language)`
 *
 * Example 1: Supported languages ["en", "fr", "es"] with fallbackLng = "en"
 * - switchDefaultLanguage("es-ES")
 * - reload page
 * - document.cookie === "i18next=es; i18nDefaultLanguageShortCode=es; i18nDefaultLanguageFullCode=es-ES"
 * - After reload, the UI and the API content is in spanish
 * - language === "es" / defaultLanguageShortCode === "es" / defaultLanguageFullCodeCode === "es-ES"
 *
 * Example 2: Supported languages ["en", "fr"] with fallbackLng = "en"
 * - switchDefaultLanguage("es-ES")
 * - reload page
 * - document.cookie === "i18next=en; i18nDefaultLanguageShortCode=es; i18nDefaultLanguageFullCode=es-ES"
 * - After reload, the UI is in english and the API content is in spanish
 * - language === "en" / defaultLanguageShortCode === "es" / defaultLanguageFullCodeCode === "es-ES"
 *
 * If you want to use language code like "en-US" in /static/locales, use the second arg of `switchDefaultLanguage`
 * `switchDefaultLanguage("fr-FR", false)` // won't strip the language code
 */
import i18next from "i18next";
import { Component, createContext } from "react";

import { setDefaultLanguageFromCookie } from "./utils";

// will be executed by default on switchDefaultLanguage (you can override it, see bellow)
const updateHtmlLangAttribute = ({
  language
}: ILanguageManagerProviderState) => {
  document.getElementsByTagName("html")[0].lang = language;
};

/**
 * Converts "fr-FR" to "fr"
 * Used by default for switchDefaultLanguage (you can override it)
 * See https://developers.themoviedb.org/3/getting-started/languages
 * @param languageCode
 */
const languageCodeToISO6391 = (languageCode: string): string =>
  languageCode.split("-").shift() as string;

export interface ILanguageManagerConsumerProps {
  language: string;
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
  switchDefaultLanguage: (
    language: string,
    formatLanguageCode?: (languageCode: string) => string
  ) => void;
}

const LanguageManagerContext = createContext<ILanguageManagerConsumerProps>(
  {} as ILanguageManagerConsumerProps
);

interface ILanguageManagerProviderProps {
  i18n: i18next.i18n;
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
}

interface ILanguageManagerProviderState {
  language: string;
  defaultLanguageShortCode: string;
  defaultLanguageFullCode: string;
}

export class LanguageManagerProvider extends Component<
  ILanguageManagerProviderProps,
  ILanguageManagerProviderState
> {
  constructor(props: ILanguageManagerProviderProps) {
    super(props);
    this.state = {
      language: props.i18n.language,
      defaultLanguageShortCode:
        props.defaultLanguageShortCode || props.i18n.language,
      defaultLanguageFullCode:
        props.defaultLanguageFullCode || props.i18n.language
    };
  }
  switchDefaultLanguage = (
    language: string,
    formatLanguageCode = languageCodeToISO6391,
    cb = updateHtmlLangAttribute
  ) => {
    const formattedLanguageCode = formatLanguageCode(language);
    setDefaultLanguageFromCookie(formattedLanguageCode);
    setDefaultLanguageFromCookie(language, true);
    this.props.i18n.changeLanguage(formattedLanguageCode);
    this.setState(
      {
        language: formattedLanguageCode,
        defaultLanguageShortCode: formattedLanguageCode,
        defaultLanguageFullCode: language
      },
      () => {
        if (typeof document !== "undefined" && typeof cb === "function") {
          cb({
            language: formattedLanguageCode,
            defaultLanguageShortCode: formattedLanguageCode,
            defaultLanguageFullCode: language
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
          defaultLanguageShortCode: this.state.defaultLanguageShortCode,
          defaultLanguageFullCode: this.state.defaultLanguageFullCode,
          switchDefaultLanguage: this.switchDefaultLanguage
        }}
      >
        {this.props.children}
      </LanguageManagerContext.Provider>
    );
  }
}

export const LanguageManagerConsumer = LanguageManagerContext.Consumer;
