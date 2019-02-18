import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, { tvMetaTagsExtractProps } from "./MetaTags";
import { TmdbTvEntity } from "../@types";

interface TvProps extends TmdbTvEntity {
  basePath: string;
  pathname: string;
}

const Tv = ({ basePath, pathname, ...tvProps }: TvProps) => {
  return (
    <>
      <MetaTags {...tvMetaTagsExtractProps(tvProps, { basePath, pathname })} />
      <MoviePreview {...tvProps} />
      <MovieCast {...tvProps} />
    </>
  );
};

export default Tv;
