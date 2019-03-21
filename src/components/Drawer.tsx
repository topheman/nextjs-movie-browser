import React from "react";
import Sidebar from "react-sidebar";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import i18next from "i18next";

import Link from "./Link";
import CloseOnEscape from "./CloseOnEscape";
import HamburgerButton from "./HamburgerButton";
import UIStore from "../stores/UIStore";
import { withNamespaces } from "../../i18n";
import { filterHtmlProps } from "../utils/helpers";

const SidebarContentWrapper = styled.div`
  padding-top: 30px;
  h3 {
    padding: 20px 10px 0 10px;
    color: gray;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 100;
    border-top: 1px solid gray;
  }
  h3:first-child {
    border-top: none;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    display: block;
    width: 250px;
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: 10px 5px;
  }
  li a {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: gray;
    padding: 0 10px;
  }
  li a span {
    margin-left: 40px;
  }
  li a:hover {
    background: #9000000f;
  }
  .home {
    background-image: url(/static/home-icon.png);
  }
  .about {
    background-image: url(/static/information-icon.png);
  }
  .qrcode {
    background-image: url(/static/qrcode.png);
  }
  .github {
    background-image: url(/static/github-retina.png);
  }
  .twitter {
    background-image: url(/static/twitter-retina.png);
  }
  .labs {
    background-image: url(/static/idea-icon.png);
  }
`;

const SidebarContent: React.FunctionComponent<{
  t: i18next.TranslationFunction;
  closeDrawer: () => void;
}> = ({ t, closeDrawer, ...remainingProps }) => {
  // only add prefetch in prod (not in test, it will fail) @todo, mock router on the testing side
  const prefetchProps =
    process.env.NODE_ENV === "production" ? { prefetch: true } : {};
  return (
    <SidebarContentWrapper {...filterHtmlProps(remainingProps)}>
      <h3>Menu</h3>
      <ul>
        <li className="home">
          <Link href={{ pathname: "/" }} as="/" {...prefetchProps}>
            <a onClick={closeDrawer} title={t("common-label-home")}>
              <span>{t("common-label-home")}</span>
            </a>
          </Link>
        </li>
        <li className="about">
          <Link href={{ pathname: "/about" }} as="/about" {...prefetchProps}>
            <a onClick={closeDrawer} title={t("common-label-about")}>
              <span>{t("common-label-about")}</span>
            </a>
          </Link>
        </li>
        <li className="qrcode">
          <Link href={{ pathname: "/qrcode" }} as="/qrcode" {...prefetchProps}>
            <a onClick={closeDrawer} title={t("common-label-show-qrcode")}>
              <span>{t("common-label-show-qrcode")}</span>
            </a>
          </Link>
        </li>
      </ul>
      <h3>External</h3>
      <ul>
        <li className="github">
          <a
            onClick={closeDrawer}
            href="https://github.com/topheman/nextjs-movie-browser"
            title="nextjs-movie-browser on github"
          >
            <span>Github</span>
          </a>
        </li>
        <li className="twitter">
          <a
            onClick={closeDrawer}
            href="https://twitter.com/topheman"
            title="@topheman on twitter"
          >
            <span>Twitter</span>
          </a>
        </li>
        <li className="labs">
          <a
            onClick={closeDrawer}
            href="http://labs.topheman.com"
            title="Visit my other projects"
          >
            <span>labs.topheman.com</span>
          </a>
        </li>
      </ul>
    </SidebarContentWrapper>
  );
};

interface Props {
  t: i18next.TranslationFunction;
  uiStore?: UIStore;
}

@inject("uiStore")
@observer
class Drawer extends React.Component<Props> {
  render() {
    return (
      <>
        <HamburgerButton
          onClick={() => this.props.uiStore!.toggleMenuOpen()}
          open={this.props.uiStore!.menuOpen}
          color="white"
          colorOpen="black"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 4,
            cursor: "pointer"
          }}
        />
        <CloseOnEscape onEscape={() => this.props.uiStore!.setMenuOpen(false)}>
          <Sidebar
            sidebar={
              <SidebarContent
                t={this.props.t}
                closeDrawer={() => this.props.uiStore!.setMenuOpen(false)}
              />
            }
            open={this.props.uiStore!.menuOpen}
            onSetOpen={open => this.props.uiStore!.setMenuOpen(open)}
            // @ts-ignore
            styles={{
              sidebar: {
                background: "white",
                zIndex: 3,
                transition: "transform .1s ease-out",
                WebkitTransition: "-webkit-transform .1s ease-out",
                willChange: "transform"
              },
              overlay: { zIndex: 2 }
            }}
          >
            {this.props.children}
          </Sidebar>
        </CloseOnEscape>
      </>
    );
  }
}

export default withNamespaces("common")(Drawer);
