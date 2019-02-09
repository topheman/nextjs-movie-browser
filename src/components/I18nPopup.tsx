import { useState } from "react";

import { LanguageList } from "../@types";
import SelectLanguage from "./SelectLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";

interface II18nPopupProps {
  defaultLanguages: LanguageList;
  translationLanguages: LanguageList;
}

/**
 * Language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) are identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api uses both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */

const I18nPopup: React.ComponentType<II18nPopupProps> = ({
  defaultLanguages,
  translationLanguages
}) => {
  const [open, toggleOpen] = useState(false);
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
          <button onClick={() => toggleOpen(!open)}>
            {translationLanguageFullCode || defaultLanguageFullCode}
          </button>
          <div style={{ display: open ? "initial" : "none" }}>
            {translationLanguages && translationLanguages.length > 0 && (
              <SelectLanguage
                style={{ display: "block" }}
                label="Translation language"
                languagesList={translationLanguages}
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

export default I18nPopup;
