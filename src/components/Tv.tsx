import React from "react";

import MoviePreview from "./MoviePreview";
import MovieContent from "./MovieContent";
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
      <MovieContent media_type="tv" data={tmdbTvEntity} />
    </>
  );
};

export default Tv;
