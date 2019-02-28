import React from "react";
import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbMovieEntity, PageRootComponent } from "../@types";

const movieMetaTagsExtractProps = (
  tmdbMovieEntity: TmdbMovieEntity
): PropsMetaTags => {
  return {
    type: "movie",
    title: (tmdbMovieEntity && tmdbMovieEntity.title) || undefined,
    description: (tmdbMovieEntity && tmdbMovieEntity.overview) || undefined,
    image: makeImageTmdbUrl(tmdbMovieEntity.backdrop_path, "w780")
  };
};

const Movie: React.FunctionComponent<PageRootComponent<TmdbMovieEntity>> = ({
  basePath,
  pathname,
  data: tmdbMovieEntity
}) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...movieMetaTagsExtractProps(tmdbMovieEntity)}
      />
      <MoviePreview media_type="movie" data={tmdbMovieEntity} />
      <MovieCast mode="preview" media_type="movie" data={tmdbMovieEntity} />
    </>
  );
};

export default Movie;
