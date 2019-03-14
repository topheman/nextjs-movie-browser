import React from "react";
import i18next from "i18next";
import Router from "next/router";
import classNames from "classnames";
import styled from "styled-components";

import { apiTmdb } from "../services/apis";
import { withNamespaces } from "../../i18n";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import HeaderTop from "./HeaderTop";
import Search from "./Search";
import { makeLinkProps } from "./Link";
import { filterHtmlProps } from "../utils/helpers";

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  z-index: 999;
  height: ${props =>
    `calc(${props.theme.headerTopHeight} + ${props.theme.searchHeight})`};
`;

const Header: React.FunctionComponent<{
  t: i18next.TranslationFunction;
  className?: string;
}> = ({ t, className, ...remainingProps }) => {
  return (
    <HeaderWrapper
      className={classNames(className)}
      {...filterHtmlProps(remainingProps)}
    >
      <HeaderTop />
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
              style={{ position: "absolute", top: "60px" }}
            />
          );
        }}
      </LanguageManagerConsumer>
    </HeaderWrapper>
  );
};

export default withNamespaces("common")(Header);
