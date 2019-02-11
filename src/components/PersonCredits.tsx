import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonMovieCredits } from "../@types";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";
import { normalizeString } from "../utils/helpers";

const PersonCredits = ({
  // t,
  movie_credits
}: {
  t: i18next.TranslationFunction;
  movie_credits: TmdbPersonMovieCredits;
}) => {
  // TODO sort by role
  return (
    movie_credits.cast && (
      <ul>
        {movie_credits.cast &&
          movie_credits.cast.map(film => (
            <li key={film.id}>
              <LinkWithLanguage
                href={{ pathname: `/movie`, query: { id: film.id } }}
                as={`/movie/${film.id}-${normalizeString(
                  film.title as string
                )}`}
              >
                <a>{film.title}</a>
              </LinkWithLanguage>
            </li>
          ))}
      </ul>
    )
  );
};

export default withNamespaces("person")(PersonCredits);
