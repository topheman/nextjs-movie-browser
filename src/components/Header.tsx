import { useState } from "react";
import i18next from "i18next";
import { withRouter, SingletonRouter } from "next/router";

import { apiTmdb } from "../services/apis";
import { withNamespaces } from "../../i18n";
import I18nPopup from "./I18nPopup";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import ShowLoadingState from "./ShowLoadingState";
import Search from "./Search";
import Link, { makeSlug } from "./Link";

const resources = [
  ["Fight Club", 550, "movie"],
  ["Pulp Fiction", 680, "movie"],
  ["Star Wars", 11, "movie"],
  ["La Cité de la peur", 15097, "movie"],
  ["Friends", 1668, "tv"],
  ["Game of Thrones", 1399, "tv"]
];

const defaultLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" }
];

const Header = ({
  t,
  router
}: {
  t: i18next.TranslationFunction;
  router: SingletonRouter;
}) => {
  // this state is not in I18nPopup because components connected to mobx can't use hooks for the moment
  const [languageChoiceOpen, toggleLanguageChoiceOpen] = useState(false);
  return (
    <>
      <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
      <LanguageManagerConsumer>
        {({ defaultLanguageFullCode, translationLanguageFullCode }) => {
          // make sure to re-render `Search` on language change
          return (
            <Search
              searchResource={(value: string, { cancelToken }) =>
                apiTmdb().searchMulti(value, {
                  language:
                    translationLanguageFullCode || defaultLanguageFullCode,
                  cancelToken
                })
              }
              goToResource={searchResult => {
                // make utils to make urls / paths ... from objects
                console.log(
                  "TODO Implement - go to resource",
                  searchResult,
                  router
                );
              }}
            />
          );
        }}
      </LanguageManagerConsumer>
      <I18nPopup
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
      <ul>
        {resources.map(([title, id, type]) => (
          <li key={id}>
            <Link
              href={{ pathname: `/${type}`, query: { id } }}
              as={`/${type}/${id}-${makeSlug(title as string)}`}
            >
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ShowLoadingState>
        {({ loading }) => <div>{loading ? "Loading ..." : "Loaded"}</div>}
      </ShowLoadingState>
    </>
  );
};

export default withNamespaces("common")(withRouter(Header));
