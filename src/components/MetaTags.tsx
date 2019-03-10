import React from "react";
import Head from "next/head";

export { makeImageTmdbUrl } from "../utils/tmdb";

interface IUrlInfos {
  basePath?: string;
  pathname?: string;
  siteName?: string;
  twitterHandle?: string;
}

export interface PropsMetaTags {
  siteName?: string;
  twitterHandle?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  type?: "movie" | "person" | "tv";
  title?: string;
  url?: string;
  description?: string;
  keywords?: string;
  image?: string;
  children?: any;
}

export const commonMetaTagsExtractProps = ({
  basePath,
  pathname,
  siteName = process.env.NEXTJS_APP_CLIENT_TITLE,
  twitterHandle = process.env.NEXTJS_APP_CLIENT_TWITTER_HANDLE
}: IUrlInfos): PropsMetaTags => {
  return {
    siteName,
    twitterHandle,
    url: (basePath && pathname && `${basePath}${pathname}`) || undefined,
    twitterCard: "summary",
    title: process.env.NEXTJS_APP_CLIENT_TITLE as string,
    description: "A NextJS implementation of the themoviedb.org website.",
    keywords: [
      "NextJS",
      "ReactJS",
      "TypeScript",
      "Tslint",
      "Jest",
      "Cypress.io",
      "i18n"
    ].join(", "),
    image: `${basePath}/static/nextjs-movie-browser.png`
  };
};

const MetaTags: React.FunctionComponent<PropsMetaTags> = ({
  children,
  siteName,
  twitterHandle,
  twitterCard,
  url,
  image,
  type,
  title,
  description,
  keywords
}) => {
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
      {keywords && <meta name="keywords" content={keywords} key="keywords" />}
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
