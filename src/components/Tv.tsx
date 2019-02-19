import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbTvEntity } from "../@types";

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

interface TvProps extends TmdbTvEntity {
  basePath: string;
  pathname: string;
}

const Tv = ({ basePath, pathname, ...tvProps }: TvProps) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...tvMetaTagsExtractProps(tvProps)}
      />
      <MoviePreview {...tvProps} />
      <MovieCast {...tvProps} />
    </>
  );
};

export default Tv;
