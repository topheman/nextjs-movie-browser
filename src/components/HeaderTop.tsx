import React, { useState } from "react";
import i18next from "i18next";
import classNames from "classnames";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import TranslationPicker from "./TranslationPicker";
import ShowLoadingState from "./ShowLoadingState";
import Link from "./Link";
import SiteNetworks from "./SiteNetworks";
import Loader from "./Loader";
import { filterHtmlProps } from "../utils/helpers";

const defaultLanguages = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "French" }
];

const HeaderTopWrapper = styled.div`
  height: ${props => props.theme.headerTopHeight};
  background-color: ${props => props.theme.primary};
  color: white;
  margin: 0 auto;
`;

const Title = styled.h1`
  position: absolute;
  top: 15px;
  left: 10px;
  margin: 0px;
  font-weight: 100;
  font-size: 1.5rem;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    top: 18px;
    font-size: 1.1rem;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;

const SiteNetworkStyled = styled(SiteNetworks)`
  position: absolute;
  top: 14px;
  right: 10px;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    display: none;
  }
`;

const TranslationPickerStyled = styled(TranslationPicker)`
  position: absolute;
  top: 20px;
  right: 110px;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    right: 10px;
  }
`;

const LoaderStyled = styled(Loader)`
  position: absolute;
  top: 10px;
  right: 50%;
  left: 50%;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    right: 30%;
    left: 70%;
  }
`;

const Header: React.FunctionComponent<{
  t: i18next.TranslationFunction;
  className?: string;
}> = ({ t, className, ...remainingProps }) => {
  // this state is not in TranslationPicker because components connected to mobx can't use hooks for the moment
  const [languageChoiceOpen, toggleLanguageChoiceOpen] = useState(false);
  return (
    <HeaderTopWrapper
      className={classNames(className)}
      {...filterHtmlProps(remainingProps)}
    >
      <Title>
        <Link href={{ pathname: "/" }} as="/">
          <a>{process.env.NEXTJS_APP_CLIENT_TITLE}</a>
        </Link>
      </Title>
      <TranslationPickerStyled
        popupOpen={languageChoiceOpen}
        togglePopupOpen={toggleLanguageChoiceOpen}
        defaultLanguages={defaultLanguages}
      />
      <SiteNetworkStyled />
      <ShowLoadingState>
        {({ loading }) => <>{loading && <LoaderStyled size={0.6} />}</>}
      </ShowLoadingState>
    </HeaderTopWrapper>
  );
};

export default withNamespaces("common")(Header);
