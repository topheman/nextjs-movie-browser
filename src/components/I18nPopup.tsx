import { inject, observer } from "mobx-react";

import { LanguageList } from "../@types";
import SelectLanguage from "./SelectLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import TranslationsStore from "../stores/TranslationsStore";

interface II18nPopupProps {
  defaultLanguages: LanguageList;
  translationsStore?: TranslationsStore;
  popupOpen: boolean;
  togglePopupOpen: (open: boolean) => void;
}

/**
 * Language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) are identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api uses both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */

const I18nPopup: React.ComponentType<II18nPopupProps> = ({
  defaultLanguages,
  translationsStore,
  popupOpen,
  togglePopupOpen
}) => {
  const translationLanguages = translationsStore!.availableLanguages;
  return (
    <LanguageManagerConsumer>
      {({
        translationLanguageFullCode,
        defaultLanguageFullCode,
        switchDefaultLanguage,
        switchTranslationLanguage,
        resetTranslationLanguage
      }) => (
        <>
          <button onClick={() => togglePopupOpen(!popupOpen)}>
            {translationLanguageFullCode || defaultLanguageFullCode}
          </button>
          <div style={{ display: popupOpen ? "initial" : "none" }}>
            {translationLanguages && translationLanguages.length > 0 && (
              <SelectLanguage
                style={{ display: "block" }}
                label="Translation language"
                languagesList={[
                  { code: "", label: "Choose your language" }
                ].concat(translationLanguages)}
                onLanguageChange={languageCode =>
                  switchTranslationLanguage(languageCode)
                }
                value={translationLanguageFullCode}
                data-testid="switch-translation-language"
              />
            )}
            {translationLanguageFullCode && (
              <button
                onClick={() => resetTranslationLanguage()}
                style={{ display: "block" }}
              >
                Reset tranlation
              </button>
            )}
            <SelectLanguage
              style={{ display: "block" }}
              label="Default language"
              languagesList={defaultLanguages}
              onLanguageChange={languageCode =>
                switchDefaultLanguage(languageCode)
              }
              value={defaultLanguageFullCode}
              data-testid="switch-default-language"
            />
          </div>
        </>
      )}
    </LanguageManagerConsumer>
  );
};

export default inject("translationsStore")(observer(I18nPopup));
