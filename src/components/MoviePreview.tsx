import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, ComponentWithData, TmdbTvEntity } from "../@types";
import TextContent from "./TextContent";
import Link from "./Link";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
}

/**
 * Preview for Movie and Tv
 */
const MoviePreview: React.FunctionComponent<IProps> = ({
  t,
  mode,
  media_type,
  data
}) => {
  return (
    <>
      <h2 dir="auto">
        {mode === "preview" && (
          <Link tmdbEntity={{ ...data, media_type }}>
            <a>👈</a>
          </Link>
        )}
        {(data as TmdbMovieEntity).title || (data as TmdbTvEntity).name}{" "}
        {(data as TmdbMovieEntity).release_date &&
          `(${new Date((data as TmdbMovieEntity).release_date).getFullYear()})`}
      </h2>
      {mode === "full" && (
        <>
          <h3>{t("movie-label-synopsis")}</h3>
          <TextContent dir="auto">{data.overview}</TextContent>
        </>
      )}
    </>
  );
};

MoviePreview.defaultProps = {
  mode: "full"
};

export default withNamespaces("movie")(MoviePreview);
