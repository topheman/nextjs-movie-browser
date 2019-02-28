import React from "react";
import Head from "next/head";

interface PropsDocumentLinkTags {
  tmdbApi?: string;
  tmdbImageCdn?: string;
  children?: any;
}

const DocumentLinkTags: React.FunctionComponent<PropsDocumentLinkTags> = ({
  tmdbApi = process.env.NEXTJS_APP_CLIENT_TMDB_API,
  tmdbImageCdn = process.env.NEXTJS_APP_CLIENT_TMDB_IMAGE_CDN,
  children
}) => {
  return (
    <Head>
      {tmdbApi && (
        <link rel="preconnect" href={tmdbApi} crossOrigin="anonymous" />
      )}
      {tmdbImageCdn && (
        <link rel="preconnect" href={tmdbImageCdn} crossOrigin="anonymous" />
      )}
      {children}
    </Head>
  );
};

export default DocumentLinkTags;
