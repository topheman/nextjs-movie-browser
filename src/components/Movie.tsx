import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import { TmdbMovieEntity } from "../@types";

const Movie = (props: TmdbMovieEntity) => {
  console.log(props);
  return (
    <>
      <MoviePreview title={props.title} overview={props.overview} />
      <MovieCast credits={props.credits} />
    </>
  );
};

export default Movie;
