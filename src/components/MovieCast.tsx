import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, TmdbTvEntity, ComponentWithData } from "../@types";
import { MainWrapper } from "./ui/Layout";
import Link from "./Link";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
}

/**
 * Casting list for Movie and Tv
 */
const MovieCast: React.FunctionComponent<IProps> = ({
  t,
  mode,
  media_type,
  data
}) => {
  return (
    <MainWrapper>
      <section>
        {data.credits.cast && data.credits.cast.length > 0 && (
          <>
            <h3>{t("movie-label-cast")}</h3>
            <ul>
              {data.credits.cast
                .filter((_, index) => {
                  if (mode === "full" || (mode === "preview" && index < 5)) {
                    return true;
                  }
                  return false;
                })
                .map(person => (
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
        {data.credits.crew && data.credits.crew.length > 0 && (
          <>
            <h3>{t("movie-label-crew")}</h3>
            <ul>
              {data.credits.crew
                .filter((_, index) => {
                  if (mode === "full" || (mode === "preview" && index < 5)) {
                    return true;
                  }
                  return false;
                })
                .map(person => (
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
        {mode === "preview" && (
          <Link tmdbEntity={{ media_type, ...data }} subcategory="cast">
            <a>{t("movie-label-full-casting")}</a>
          </Link>
        )}
      </section>
    </MainWrapper>
  );
};

MovieCast.defaultProps = {
  mode: "full"
};

export default withNamespaces("movie")(MovieCast);
