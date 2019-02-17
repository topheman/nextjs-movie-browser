import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import MetaTags, { movieMetaTagsExtractProps } from "./MetaTags";
import { TmdbMovieEntity } from "../@types";

interface MovieProps extends TmdbMovieEntity {
  basePath: string;
  pathname: string;
}

const Movie = ({ basePath, pathname, ...movieProps }: MovieProps) => {
  return (
    <>
      <MetaTags
        {...movieMetaTagsExtractProps(movieProps, { basePath, pathname })}
      />
      <MoviePreview title={movieProps.title} overview={movieProps.overview} />
      <MovieCast credits={movieProps.credits} />
    </>
  );
};

export default Movie;
