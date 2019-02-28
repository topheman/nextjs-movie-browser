import React from "react";
import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbTvEntity, PageRootComponent } from "../@types";

export const tvMetaTagsExtractProps = (
  tmdbTvEntity: TmdbTvEntity
): PropsMetaTags => {
  return {
    type: "tv",
    title: (tmdbTvEntity && tmdbTvEntity.name) || undefined,
    description: (tmdbTvEntity && tmdbTvEntity.overview) || undefined,
    image: makeImageTmdbUrl(tmdbTvEntity.poster_path, "w780")
  };
};

const Tv: React.FunctionComponent<PageRootComponent<TmdbTvEntity>> = ({
  basePath,
  pathname,
  data: tmdbTvEntity
}) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...tvMetaTagsExtractProps(tmdbTvEntity)}
      />
      <MoviePreview media_type="tv" data={tmdbTvEntity} />
      <MovieCast mode="preview" media_type="tv" data={tmdbTvEntity} />
    </>
  );
};

export default Tv;
