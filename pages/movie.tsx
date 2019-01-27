import Head from "next/head";
import i18next from "i18next";

import Layout from "../src/components/Layout";
import { withNamespaces, retrieveLanguageFromPageProps } from "../i18n";
import { apiTmdb } from "../src/services/apis";
import { TmdbMovieEntity } from "../src/@types/tmdb";

/**
 * ⚠️ TODO connect the page component to the language Provider when ready
 * (which will trigger re-render on language change)
 *
 * Returns Server Side rendered page on first load
 * Then the client will do the the request to the API and do the render
 */
const Movie = ({
  data,
  t
}: {
  data: TmdbMovieEntity;
  t: i18next.TranslationFunction;
}) => {
  const { title, overview } = data;
  return (
    <>
      <Head>
        <meta name="description" content={overview} />
      </Head>
      <Layout>
        <h2>{title}</h2>
        <h3>{t("movie-label-synopsis")}</h3>
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
}): Promise<{
  data: TmdbMovieEntity;
  server: boolean;
  namespacesRequired: string[];
}> => {
  const language = retrieveLanguageFromPageProps(props);
  const data = await apiTmdb().movie(props.query.id, { language });
  return {
    data,
    server: !!props.req,
    namespacesRequired: ["movie", "common"]
  };
};

export default withNamespaces("movie")(Movie);
