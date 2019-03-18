import React from "react";
import i18next from "i18next";

import MetaTags, { commonMetaTagsExtractProps } from "./MetaTags";
import Link, { TmdbEntityMinimum } from "./Link";
import { MainWrapper } from "./ui/Layout";
import { withNamespaces } from "../../i18n";
import {
  TmdbTrendingResults,
  PageRootComponent,
  TmdbTrendingResultsEntity
} from "../@types";

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
        twitterCard="summary_large_image"
      />
      <MainWrapper>
        <section style={{ marginTop: 110 }}>
          <h1>{t("home-title")}</h1>
          <p>
            This project is a <strong>NextJS</strong> implementation of the{" "}
            <em>themoviedb.org</em> website.
          </p>
          <p>
            ℹ️{" "}
            <Link href={{ pathname: "/about" }} as="/about">
              <a>Read more about the project</a>
            </Link>
            .
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
        </section>
      </MainWrapper>
    </>
  );
};

export default withNamespaces("home")(Home);
