import Head from "next/head";

import { TmdbMovieEntity, TmdbPersonEntity, TmdbTvEntity } from "../@types";
import { makeImageTmdbUrl } from "../utils/tmdb";

interface IUrlInfos {
  basePath?: string;
  pathname?: string;
  siteName?: string;
  twitterHandle?: string;
}

interface PropsMetaTags {
  siteName?: string;
  twitterHandle?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  type?: "movie" | "person" | "tv";
  title?: string;
  url?: string;
  description?: string;
  image?: string;
  children?: any;
}

const commonMetaTagsExtractProps = ({
  basePath,
  pathname,
  siteName = process.env.NEXTJS_APP_CLIENT_TITLE,
  twitterHandle = process.env.NEXTJS_APP_CLIENT_TWITTER_HANDLE
}: IUrlInfos): PropsMetaTags => {
  return {
    url: (basePath && pathname && `${basePath}${pathname}`) || undefined,
    siteName,
    twitterHandle,
    twitterCard: "summary"
  };
};

export const movieMetaTagsExtractProps = (
  tmdbMovieEntity: TmdbMovieEntity,
  options: IUrlInfos
): PropsMetaTags => {
  return {
    ...commonMetaTagsExtractProps(options),
    type: "movie",
    title: (tmdbMovieEntity && tmdbMovieEntity.title) || undefined,
    description: (tmdbMovieEntity && tmdbMovieEntity.overview) || undefined,
    image: makeImageTmdbUrl(tmdbMovieEntity.backdrop_path, "w780")
  };
};

export const personMetaTagsExtractProps = (
  tmdbPersonEntity: TmdbPersonEntity,
  options: IUrlInfos
): PropsMetaTags => {
  return {
    ...commonMetaTagsExtractProps(options),
    type: "person",
    title: (tmdbPersonEntity && tmdbPersonEntity.name) || undefined,
    description: (tmdbPersonEntity && tmdbPersonEntity.biography) || undefined,
    image: makeImageTmdbUrl(tmdbPersonEntity.profile_path, "w780")
  };
};

export const tvMetaTagsExtractProps = (
  tmdbTvEntity: TmdbTvEntity,
  options: IUrlInfos
): PropsMetaTags => {
  return {
    ...commonMetaTagsExtractProps(options),
    type: "tv",
    title: (tmdbTvEntity && tmdbTvEntity.name) || undefined,
    description: (tmdbTvEntity && tmdbTvEntity.overview) || undefined,
    image: makeImageTmdbUrl(tmdbTvEntity.poster_path, "w780")
  };
};

const MetaTags = ({
  children,
  siteName,
  twitterHandle,
  twitterCard,
  url,
  image,
  type,
  title,
  description
}: PropsMetaTags) => {
  return (
    <Head>
      {url && <link rel="canonical" href={url} />}
      {type && <meta property="og:type" content={type} key="og-type" />}
      {title && <meta property="og:title" content={title} key="og-title" />}
      {url && <meta property="og:url" content={url} key="og-url" />}
      {image && <meta property="og:image" content={image} key="og-image" />}
      {siteName && (
        <meta property="og:site_name" content={siteName} key="og-siteName" />
      )}
      {twitterCard && (
        <meta name="twitter:card" content={twitterCard} key="twitter-card" />
      )}
      {twitterHandle && (
        <meta name="twitter:site" content={twitterHandle} key="twitter-site" />
      )}
      {twitterHandle && (
        <meta
          name="twitter:creator"
          content={twitterHandle}
          key="twitter-creator"
        />
      )}
      {title && (
        <meta name="twitter:title" content={title} key="twitter-title" />
      )}
      {url && <meta name="twitter:url" content={url} key="twitter-url" />}
      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="twitter-description"
        />
      )}
      {image && (
        <meta name="twitter:image" content={image} key="twitter-image" />
      )}
      {description && (
        <meta name="description" content={description} key="description" />
      )}
      {children}
    </Head>
  );
};

export default MetaTags;
