import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbCredits } from "../@types";
import Link from "./Link";

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
                <Link tmdbEntity={{ media_type: "person", ...person }}>
                  <a>{person.name}</a>
                </Link>{" "}
                <i>{person.character}</i>
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
                <Link tmdbEntity={{ media_type: "person", ...person }}>
                  <a>{person.name}</a>
                </Link>{" "}
                {person.job} <i>({person.department})</i>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default withNamespaces("movie")(MovieCast);
