import { useState } from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import I18nPopup from "./I18nPopup";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";
import { normalizeString } from "../utils/helpers";

const films = [
  ["Fight Club", 550],
  ["Pulp Fiction", 680],
  ["Star Wars", 11],
  ["La Cité de la peur", 15097]
];

const defaultLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" }
];

const Header = ({ t }: { t: i18next.TranslationFunction }) => {
  // this state is not in I18nPopup because components connected to mobx can't use hooks for the moment
  const [languageChoiceOpen, toggleLanguageChoiceOpen] = useState(false);
  return (
    <>
      <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
      <I18nPopup
        popupOpen={languageChoiceOpen}
        togglePopupOpen={toggleLanguageChoiceOpen}
        defaultLanguages={defaultLanguages}
      />
      <ul>
        <li>
          <LinkWithLanguage href="/">
            <a>{t("common-label-home")}</a>
          </LinkWithLanguage>
        </li>
        <li>
          <LinkWithLanguage href="/about">
            <a>{t("common-label-about")}</a>
          </LinkWithLanguage>
        </li>
      </ul>
      <ul>
        {films.map(([title, id]) => (
          <li key={id}>
            <LinkWithLanguage
              href={{ pathname: `/movie`, query: { id } }}
              as={`/movie/${id}-${normalizeString(title as string)}`}
            >
              <a>{title}</a>
            </LinkWithLanguage>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withNamespaces("common")(Header);
