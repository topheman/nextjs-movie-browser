import React from "react";

import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import { LanguageList } from "../@types";

export interface ISwitchLanguageProps {
  languages: LanguageList;
}

/**
 * Language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) are identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api uses both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */

const SwitchLanguage: React.ComponentType<ISwitchLanguageProps> = ({
  languages,
  ...remainingProps
}) => {
  return (
    <LanguageManagerConsumer>
      {({ defaultLanguageFullCode, switchDefaultLanguage }) => (
        <select
          {...remainingProps}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value) {
              switchDefaultLanguage(e.target.value);
            }
          }}
          value={defaultLanguageFullCode}
        >
          {languages.map(({ code, label }) => {
            return (
              <option key={code} value={code}>
                {label}
              </option>
            );
          })}
        </select>
      )}
    </LanguageManagerConsumer>
  );
};

export default SwitchLanguage;
