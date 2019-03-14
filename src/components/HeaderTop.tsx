import React, { useState } from "react";
import i18next from "i18next";
import classNames from "classnames";

import { withNamespaces } from "../../i18n";
import TranslationPicker from "./TranslationPicker";
import ShowLoadingState from "./ShowLoadingState";
import Link from "./Link";
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
      <h1>
        🎬 {process.env.NEXTJS_APP_CLIENT_TITLE}{" "}
        <img src="/static/themoviedb-logo.svg" style={{ width: 25 }} />
      </h1>
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
