import Head from "next/head";

import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import { TmdbMovieEntity } from "../@types";

const Movie = (props: TmdbMovieEntity) => {
  return (
    <>
      <Head>
        <meta name="description" content={props.overview} />
      </Head>
      <MoviePreview title={props.title} overview={props.overview} />
      <MovieCast credits={props.credits} />
    </>
  );
};

export default Movie;
