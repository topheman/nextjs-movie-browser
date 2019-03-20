import React from "react";
import i18next from "i18next";

import MetaTags, { commonMetaTagsExtractProps } from "./MetaTags";
import HomeIcon from "./ui/HomeIcon";
import Link from "./Link";
import { MainWrapper } from "./ui/Layout";
import { withNamespaces } from "../../i18n";
import { PageRootComponent } from "../@types";

interface IProps extends PageRootComponent<any> {
  t: i18next.TranslationFunction;
}

const About: React.FunctionComponent<IProps> = ({ basePath, pathname, t }) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        twitterCard="summary_large_image"
      />
      <MainWrapper>
        <section style={{ marginTop: 110 }}>
          <h1>{t("common-about-title")}</h1>
          <p>
            <Link href={{ pathname: "/" }} as="/">
              <a title="Back to Home page">
                <HomeIcon style={{ margin: "0 7px -7px 0px" }} /> Back to Home
                page
              </a>
            </Link>
          </p>
          <p>
            This project is a <strong>NextJS</strong> implementation of the{" "}
            <a href="https://www.themoviedb.org">themoviedb.org</a> website. The
            main goal was to dive deep into the NextJS framework with the
            following constaints/features:
          </p>
          <ul>
            <li>
              <strong>SSR (Server Side Rendering)</strong>: use NextJS to Server
              Side render the page with the data retrieved from the API and have
              a transparent client side navigation
              <ul>
                <li>
                  <strong>critical-path CSS</strong>: extracting critical CSS is
                  made easy using a CSS-in-JS library like styled-component
                </li>
              </ul>
            </li>
            <li>
              <strong>SEO friendly</strong>: server side render meta tags
              relative to content based on API result
            </li>
            <li>
              <strong>Social Media cards friendly</strong>: server side render
              meta tags relative to twitter/facebook ... to customize
              thumbnails/description when page is shared (also works for slack,
              messenger, WhatsApp ...)
            </li>
            <li>
              <strong>i18n</strong>
              <ul>
                <li>
                  Support multi-language
                  <ul>
                    <li>From the API content</li>
                    <li>From the UI</li>
                  </ul>
                </li>
                <li>
                  Support Right-to-Left (rtl) languages such as Hebrew, Persian
                  ...
                </li>
                <li>Switch language on the fly</li>
              </ul>
            </li>
            <li>
              <strong>High quality project</strong>
              <ul>
                <li>
                  code quality good practices (type checking, linting, unit/e2e
                  testing, git hooks, cis ...)
                </li>
                <li>automation / dev pipeline</li>
                <li>documentation</li>
              </ul>
            </li>
          </ul>
        </section>
      </MainWrapper>
    </>
  );
};

export default withNamespaces("common")(About);
