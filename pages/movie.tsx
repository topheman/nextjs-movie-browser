import "isomorphic-fetch";
import Head from "next/head";

import Layout from "../src/components/Layout";

type TmdbMovieResult = {
  title: string;
  overview: string;
};

const getMovie = async (
  id: string | number,
  cb?: (data: TmdbMovieResult) => any
): Promise<TmdbMovieResult> => {
  const response = await fetch(
    `${process.env.NEXTJS_APP_CLIENT_TMDB_API_ROOT_URL}/movie/${id}?api_key=${
      process.env.NEXTJS_APP_CLIENT_TMDB_API_KEY
    }`
  );
  const data = await response.json();
  if (cb) {
    cb(data);
  }
  return data;
};

/**
 * Returns Server Side rendered page on first load
 * Then the client will do the the request to the API and do the render
 */
const Movie = ({ data }: { data: TmdbMovieResult }) => {
  const { title, overview } = data;
  return (
    <>
      <Head>
        <meta name="description" content={overview} />
      </Head>
      <Layout>
        <h2>{title}</h2>
        <p>{overview}</p>
      </Layout>
    </>
  );
};

/**
 * Static method that will trigger a request to the API from the server
 * and pass the result as props to the render method.
 */
Movie.getInitialProps = async (props: {
  req: any;
  query: { id: string };
}): Promise<{ data: TmdbMovieResult; isServer: boolean }> => {
  const data = await getMovie(props.query.id);
  return { data, isServer: !!props.req };
};

export default Movie;
