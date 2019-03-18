import React from "react";

import SimpleBanner from "./SimpleBanner";
import TvSeasons from "./TvSeasons";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbTvEntity, PageRootComponent } from "../@types";

const tvMetaTagsExtractProps = (tmdbTvEntity: TmdbTvEntity): PropsMetaTags => {
  return {
    type: "tv",
    title: (tmdbTvEntity && tmdbTvEntity.name) || undefined,
    description: (tmdbTvEntity && tmdbTvEntity.overview) || undefined,
    image: makeImageTmdbUrl(tmdbTvEntity.poster_path, "w780")
  };
};

const Seasons: React.FunctionComponent<PageRootComponent<TmdbTvEntity>> = ({
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
      <SimpleBanner media_type="tv" data={tmdbTvEntity} />
      <TvSeasons data={tmdbTvEntity} />
    </>
  );
};

export default Seasons;
