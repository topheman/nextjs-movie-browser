import i18next from "i18next";
// import LinkWithLanguage from "next/link";

import { withNamespaces } from "../../i18n";
import I18nPopup from "./I18nPopup";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";

const films = [["Fight Club", 550], ["Pulp Fiction", 680], ["Star Wars", 11]];

const defaultLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" },
  { code: "es-ES", label: "Spanish" },
  { code: "he-IL", label: "Hebrew" },
  { code: "fa-IR", label: "Persian" },
  { code: "pt-PT", label: "Portuguese" }
];

const translationLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" },
  { code: "es-ES", label: "Spanish" },
  { code: "he-IL", label: "Hebrew" },
  { code: "fa-IR", label: "Persian" },
  { code: "pt-PT", label: "Portuguese" }
];

const Header = ({ t }: { t: i18next.TranslationFunction }) => (
  <>
    <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
    <I18nPopup
      defaultLanguages={defaultLanguages}
      translationLanguages={translationLanguages}
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
            as={`/movie/${id}`}
          >
            <a>{title}</a>
          </LinkWithLanguage>{" "}
          /{" "}
          <LinkWithLanguage
            href={{ pathname: `/movie`, query: { id } }}
            as={`/movie/${id}-${(title as string)
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <a>{title}</a>
          </LinkWithLanguage>
        </li>
      ))}
    </ul>
  </>
);

export default withNamespaces("common")(Header);
