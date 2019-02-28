import React from "react";

import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import { TmdbMovieEntity, TmdbTvEntity, PageRootComponent } from "../@types";

// TODO add metatags

interface CastProps extends PageRootComponent<TmdbMovieEntity & TmdbTvEntity> {
  basePath: string;
  pathname: string;
  media_type: "movie" | "tv";
}

const Cast: React.FunctionComponent<CastProps> = ({
  // @ts-ignore
  basePath,
  // @ts-ignore
  pathname,
  media_type,
  data: tmdbEntity
}) => {
  return (
    <>
      <MoviePreview media_type={media_type} mode="preview" data={tmdbEntity} />
      <MovieCast media_type={media_type} data={tmdbEntity} />
    </>
  );
};

export const makeCast = ({ media_type }: { media_type: "movie" | "tv" }) => (
  props: any
) => <Cast media_type={media_type} {...props} />;
