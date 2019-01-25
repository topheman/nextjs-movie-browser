import Head from "next/head";

import Layout from "../src/components/Layout";
import { apiTmdb } from "../src/services/apis";
import { TmdbMovieEntity } from "../src/@types/tmdb";

/**
 * Returns Server Side rendered page on first load
 * Then the client will do the the request to the API and do the render
 */
const Movie = ({ data }: { data: TmdbMovieEntity }) => {
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
}): Promise<{ data: TmdbMovieEntity; server: boolean }> => {
  const data = await apiTmdb().movie(props.query.id);
  return { data, server: !!props.req };
};

export default Movie;
