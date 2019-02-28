import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { ComponentWithData, TmdbPersonEntity } from "../@types";
import Link from "./Link";

interface IProps extends ComponentWithData<TmdbPersonEntity> {
  t: i18next.TranslationFunction;
}

const PersonCredits: React.FunctionComponent<IProps> = ({ t, data }) => {
  // TODO sort by role / merge cast and crew ...
  return (
    <>
      {data.movie_credits && data.movie_credits.cast && (
        <>
          <h3>{t("person-label-movies")}</h3>
          <ul>
            {data.movie_credits.cast &&
              data.movie_credits.cast
                .slice()
                .sort((a, b) => (a.release_date > b.release_date ? 1 : -1))
                .map(film => (
                  <li key={film.credit_id}>
                    <Link tmdbEntity={{ media_type: "movie", ...film }}>
                      <a>
                        {film.title}{" "}
                        {film.release_date &&
                          `(${new Date(film.release_date).getFullYear()})`}
                      </a>
                    </Link>{" "}
                    <i>{film.character}</i>
                  </li>
                ))}
          </ul>
        </>
      )}
      {data.tv_credits && data.tv_credits.cast && (
        <>
          <h3>{t("person-label-series")}</h3>
          <ul>
            {data.tv_credits.cast &&
              data.tv_credits.cast.map(serie => (
                <li key={serie.credit_id}>
                  <Link tmdbEntity={{ media_type: "tv", ...serie }}>
                    <a>{serie.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default withNamespaces("person")(PersonCredits);
