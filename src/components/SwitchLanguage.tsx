import React, { useState } from "react";

import { i18n } from "../../i18n";

/**
 * ⚠️ TODO
 *
 * 1.
 * Manage language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) will be identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api will use both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 *
 * 2.
 * The `useState` code bellow is temporary, lift state in a provider that will hold:
 * - languageCode
 * - languageFullCode
 *
 * 3.
 * Keep track of a "languageWantedCode" in the cookie to force languages with no translations
 * but which could show content from the API in the language and interface in en.
 */
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" }
];

const SwitchLanguage = () => {
  const [localLanguage, setLocalLanguage] = useState(i18n.language);
  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
          i18n.changeLanguage(e.target.value);
          setLocalLanguage(e.target.value);
        }
      }}
      value={localLanguage}
    >
      {languages.map(({ code, label }) => {
        return (
          <option key={code} value={code}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default SwitchLanguage;
