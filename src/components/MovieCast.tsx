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
      {credits.cast && (
        <>
          <h3>{t("movie-label-cast")}</h3>
          <ul>
            {credits.cast.map(person => (
              <li key={person.credit_id}>
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
        </>
      )}
      {credits.crew && (
        <>
          <h3>{t("movie-label-crew")}</h3>
          <ul>
            {credits.crew.map(person => (
              <li key={person.credit_id}>
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
        </>
      )}
    </>
  );
};

export default withNamespaces("movie")(MovieCast);
