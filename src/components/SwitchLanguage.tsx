import React from "react";

import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";

/**
 * ⚠️ TODO
 *
 * Manage language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) will be identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api will use both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" }
];

const SwitchLanguage = () => {
  return (
    <LanguageManagerConsumer>
      {({ languageOverride, switchLanguage }) => (
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value) {
              switchLanguage(e.target.value);
            }
          }}
          value={languageOverride}
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
