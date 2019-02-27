import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbMovieEntity } from "../@types";

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

interface MovieProps extends TmdbMovieEntity {
  basePath: string;
  pathname: string;
}

const Movie = ({ basePath, pathname, ...movieProps }: MovieProps) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...movieMetaTagsExtractProps(movieProps)}
      />
      <MoviePreview media_type="movie" {...movieProps} />
      <MovieCast mode="preview" media_type="movie" {...movieProps} />
    </>
  );
};

export default Movie;
