import React, { useState } from "react";
import i18next from "i18next";
import Router from "next/router";
import classNames from "classnames";

import { apiTmdb } from "../services/apis";
import { withNamespaces } from "../../i18n";
import TranslationPicker from "./TranslationPicker";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import ShowLoadingState from "./ShowLoadingState";
import Search from "./Search";
import Link, { makeLinkProps } from "./Link";
import { filterHtmlProps } from "../utils/helpers";

const defaultLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" }
];

const Header: React.FunctionComponent<{
  t: i18next.TranslationFunction;
  className?: string;
}> = ({ t, className, ...remainingProps }) => {
  // this state is not in TranslationPicker because components connected to mobx can't use hooks for the moment
  const [languageChoiceOpen, toggleLanguageChoiceOpen] = useState(false);
  return (
    <div className={classNames(className)} {...filterHtmlProps(remainingProps)}>
      <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
      <ul
        style={{
          position: "absolute",
          top: "0px",
          right: "10px",
          textAlign: "right",
          listStyle: "none"
        }}
      >
        <li>
          <a href="https://twitter.com/topheman" title="@topheman on twitter">
            twitter
          </a>
        </li>
        <li>
          <a
            href="https://github.com/topheman/nextjs-movie-browser"
            title="sources on github"
          >
            github
          </a>
        </li>
      </ul>
      <LanguageManagerConsumer>
        {({ defaultLanguageFullCode, translationLanguageFullCode }) => {
          // make sure to re-render `Search` on language change
          return (
            <Search
              searchResource={(value: string, { cancelToken }) =>
                apiTmdb().searchMulti(value, {
                  cancelToken,
                  language:
                    translationLanguageFullCode || defaultLanguageFullCode
                })
              }
              goToResource={searchResult => {
                const { href, as } = makeLinkProps(
                  searchResult,
                  translationLanguageFullCode
                );
                console.log("goToResource", href, as);
                Router.push(href, as);
              }}
            />
          );
        }}
      </LanguageManagerConsumer>
      <TranslationPicker
        popupOpen={languageChoiceOpen}
        togglePopupOpen={toggleLanguageChoiceOpen}
        defaultLanguages={defaultLanguages}
      />
      <ul>
        <li>
          <Link href="/">
            <a>{t("common-label-home")}</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>{t("common-label-about")}</a>
          </Link>
        </li>
      </ul>
      <ShowLoadingState>
        {({ loading }) => <div>{loading ? "Loading ..." : "Loaded"}</div>}
      </ShowLoadingState>
    </div>
  );
};

export default withNamespaces("common")(Header);
