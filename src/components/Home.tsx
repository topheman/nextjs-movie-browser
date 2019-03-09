import React from "react";
import i18next from "i18next";

import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags
} from "./MetaTags";
import Link, { TmdbEntityMinimum } from "./Link";
import { withNamespaces } from "../../i18n";
import {
  TmdbTrendingResults,
  PageRootComponent,
  TmdbTrendingResultsEntity
} from "../@types";

const homeMetaTagsExtractProps = ({
  basePath
}: {
  basePath: string;
}): PropsMetaTags => {
  return {
    title: process.env.NEXTJS_APP_CLIENT_TITLE as string,
    description: "A NextJS implementation of the themoviedb.org website.",
    image: `${basePath}/static/nextjs-movie-browser.png`
  };
};

interface IProps extends PageRootComponent<TmdbTrendingResults> {
  t: i18next.TranslationFunction;
}

const Home: React.FunctionComponent<IProps> = ({
  basePath,
  pathname,
  t,
  data
}) => {
  const processedData = data.results.reduce<{
    tv: TmdbTrendingResultsEntity[];
    movie: TmdbTrendingResultsEntity[];
  }>(
    (acc, cur) => {
      if (cur.first_air_date) {
        acc.tv.push(cur);
      } else {
        acc.movie.push(cur);
      }
      return acc;
    },
    { tv: [], movie: [] }
  );
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...homeMetaTagsExtractProps({ basePath })}
        twitterCard="summary_large_image"
      />
      <h1>{t("home-title")}</h1>
      <p>
        This project is a <strong>NextJS</strong> implementation of the{" "}
        <em>themoviedb.org</em> website.
      </p>
      <p>
        <Link href={{ pathname: "/about" }} as="/about">
          <a>Read more about the project</a>
        </Link>{" "}
        /{" "}
        <a href="https://github.com/topheman/nextjs-movie-browser">
          Checkout the github repo
        </a>
      </p>
      {processedData.movie.length > 0 && (
        <>
          <h2>Movies</h2>
          <ul>
            {processedData.movie.map(movie => (
              <li key={movie.id}>
                <Link
                  tmdbEntity={
                    { media_type: "movie", ...movie } as TmdbEntityMinimum
                  }
                >
                  <a>{movie.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {processedData.tv.length > 0 && (
        <>
          <h2>Series</h2>
          <ul>
            {processedData.tv.map(tv => (
              <li key={tv.id}>
                <Link
                  tmdbEntity={
                    { media_type: "tv" as "tv", ...tv } as TmdbEntityMinimum
                  }
                >
                  <a>{tv.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default withNamespaces("home")(Home);
