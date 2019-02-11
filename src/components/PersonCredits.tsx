import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonMovieCredits, TmdbPersonTvCredits } from "../@types";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";
import { normalizeString } from "../utils/helpers";

const PersonCredits = ({
  t,
  movie_credits,
  tv_credits
}: {
  t: i18next.TranslationFunction;
  movie_credits: TmdbPersonMovieCredits;
  tv_credits: TmdbPersonTvCredits;
}) => {
  // TODO sort by role / merge cast and crew ...
  return (
    <>
      {movie_credits && movie_credits.cast && (
        <>
          <h3>{t("person-label-movies")}</h3>
          <ul>
            {movie_credits.cast &&
              movie_credits.cast.map(film => (
                <li key={film.credit_id}>
                  <LinkWithLanguage
                    href={{ pathname: `/movie`, query: { id: film.id } }}
                    as={`/movie/${film.id}-${normalizeString(
                      film.original_title as string
                    )}`}
                  >
                    <a>{film.title}</a>
                  </LinkWithLanguage>
                </li>
              ))}
          </ul>
        </>
      )}
      {tv_credits && tv_credits.cast && (
        <>
          <h3>{t("person-label-series")}</h3>
          <ul>
            {tv_credits.cast &&
              tv_credits.cast.map(serie => (
                <li key={serie.credit_id}>{serie.name}</li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default withNamespaces("person")(PersonCredits);
