import React from "react";

import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbMovieEntity, TmdbTvEntity, PageRootComponent } from "../@types";

const movieOrTvMetaTagsExtractProps = (
  tmdbEntity: TmdbMovieEntity & TmdbTvEntity,
  media_type: "movie" | "tv"
): PropsMetaTags => {
  return {
    type: media_type,
    title:
      (tmdbEntity && (tmdbEntity as TmdbMovieEntity).title) ||
      (tmdbEntity && (tmdbEntity as TmdbTvEntity).name) ||
      undefined,
    description: (tmdbEntity && tmdbEntity.overview) || undefined,
    image: makeImageTmdbUrl(
      (tmdbEntity as TmdbMovieEntity).backdrop_path ||
        (tmdbEntity as TmdbTvEntity).poster_path,
      "w780"
    )
  };
};

interface CastProps extends PageRootComponent<TmdbMovieEntity & TmdbTvEntity> {
  basePath: string;
  pathname: string;
  media_type: "movie" | "tv";
}

const Cast: React.FunctionComponent<CastProps> = ({
  basePath,
  pathname,
  media_type,
  data: tmdbEntity
}) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...movieOrTvMetaTagsExtractProps(tmdbEntity, media_type)}
      />
      <MoviePreview media_type={media_type} mode="preview" data={tmdbEntity} />
      <MovieCast media_type={media_type} data={tmdbEntity} />
    </>
  );
};

export const makeCast = ({ media_type }: { media_type: "movie" | "tv" }) => (
  props: any
) => <Cast media_type={media_type} {...props} />;
