import React from "react";

import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import { LanguageList } from "../@types";

export interface ISwitchLanguageProps {
  defaultLanguages: LanguageList;
  translationLanguages: LanguageList;
}

/**
 * Language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) are identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api uses both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */

const SwitchLanguage: React.ComponentType<ISwitchLanguageProps> = ({
  defaultLanguages,
  translationLanguages,
  ...remainingProps
}) => {
  return (
    <LanguageManagerConsumer>
      {({
        translationLanguageFullCode,
        defaultLanguageFullCode,
        switchDefaultLanguage,
        switchTranslationLanguage,
        resetTranslationLanguage
      }) => (
        <div {...remainingProps}>
          {translationLanguages && translationLanguages.length > 0 && (
            <div>
              <label>
                <span>Translation language</span>
                <select
                  data-testid="switch-translation-language"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (e.target.value) {
                      switchTranslationLanguage(e.target.value);
                    }
                  }}
                  value={translationLanguageFullCode}
                >
                  {translationLanguages.map(({ code, label }) => {
                    return (
                      <option key={code} value={code}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          )}
          {translationLanguageFullCode && (
            <div>
              <button onClick={() => resetTranslationLanguage()}>
                Reset tranlation
              </button>
            </div>
          )}
          <div>
            <label>
              <span>Default language</span>
              <select
                data-testid="switch-default-language"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  if (e.target.value) {
                    switchDefaultLanguage(e.target.value);
                  }
                }}
                value={defaultLanguageFullCode}
              >
                {defaultLanguages.map(({ code, label }) => {
                  return (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
      )}
    </LanguageManagerConsumer>
  );
};

export default SwitchLanguage;
