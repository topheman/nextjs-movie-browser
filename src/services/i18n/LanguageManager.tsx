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
 * - languageOverride: this one WON'T fallback to fallbackLng on refresh if no translations supported
 *     -> you can rely on it for language code selection combo box for example
 * - switchLanguage(language)
 *
 * Example 1: Supported languages ["en", "fr", "es"] with fallbackLng = "en"
 * - switchLanguage("es")
 * - reload page
 * - document.cookie === "i18next=es; i18nOverride=es"
 * - After reload, the UI and the API content is in spanish
 * - language === "es" / languageOverride === "es"
 *
 * Example 2: Supported languages ["en", "fr"] with fallbackLng = "en"
 * - switchLanguage("es")
 * - reload page
 * - document.cookie === "i18next=en; i18nOverride=es"
 * - After reload, the UI is in english and the API content is in spanish
 * - language === "en" / languageOverride === "es"
 */
import i18next from "i18next";
import { Component, createContext } from "react";

import { setLanguageOverrideFromCookie } from "./utils";

export interface ILanguageManagerConsumerProps {
  language: string;
  languageOverride: string;
  switchLanguage: (language: string) => void;
}

const LanguageManagerContext = createContext<ILanguageManagerConsumerProps>(
  {} as ILanguageManagerConsumerProps
);

interface ILanguageManagerProvider {
  i18n: i18next.i18n;
  languageOverride: string;
}

export class LanguageManagerProvider extends Component<
  ILanguageManagerProvider,
  { language: string; languageOverride: string }
> {
  constructor(props: ILanguageManagerProvider) {
    super(props);
    this.state = {
      language: props.i18n.language,
      languageOverride: props.languageOverride || props.i18n.language
    };
  }
  switchLanguage = (language: string) => {
    this.props.i18n.changeLanguage(language);
    setLanguageOverrideFromCookie(language);
    this.setState({
      language,
      languageOverride: language
    });
  };
  render() {
    return (
      <LanguageManagerContext.Provider
        value={{
          language: this.state.language,
          languageOverride: this.state.languageOverride,
          switchLanguage: this.switchLanguage
        }}
      >
        {this.props.children}
      </LanguageManagerContext.Provider>
    );
  }
}

export const LanguageManagerConsumer = LanguageManagerContext.Consumer;
