import Head from "next/head";

interface PropsMetaTags {
  url: string;
  translationFullCodes: string[];
  children?: any;
}

const LinkHreflangTags = ({
  url,
  translationFullCodes,
  children
}: PropsMetaTags) => {
  return (
    <Head>
      <link
        rel="alternate"
        hrefLang="x-default"
        href={url}
        key="link-hreflang-default"
      />
      {translationFullCodes &&
        translationFullCodes.map(translationCode => (
          <link
            rel="alternate"
            hrefLang={translationCode}
            href={`${url}/${translationCode}`}
            key={`link-hreflang-${translationCode}`}
          />
        ))}
      {children}
    </Head>
  );
};

export default LinkHreflangTags;
