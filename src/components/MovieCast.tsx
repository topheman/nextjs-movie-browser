import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbCredits } from "../@types";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";
import { normalizeString } from "../utils/helpers";

const MovieCast = ({
  t,
  credits
}: {
  t: i18next.TranslationFunction;
  credits: TmdbCredits;
}) => {
  return (
    <>
      <h3>{t("movie-label-cast")}</h3>
      {credits.cast && (
        <ul>
          {credits.cast.map(person => (
            <li key={person.id}>
              <LinkWithLanguage
                href={{ pathname: `/person`, query: { id: person.id } }}
                as={`/person/${person.id}-${normalizeString(
                  person.name as string
                )}`}
              >
                <a>{person.name}</a>
              </LinkWithLanguage>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default withNamespaces("movie")(MovieCast);
