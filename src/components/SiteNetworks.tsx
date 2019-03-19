/**
 * Based on https://github.com/topheman/npm-registry-browser/blob/master/src/components/Header.css
 */

import styled from "styled-components";

import { filterHtmlProps } from "../utils/helpers";

const UlWrapper = styled.ul`
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
  & > li {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
  }
  & > li a {
    display: block;
    width: 32px;
    height: 32px;
    text-decoration: none;
    padding-top: 0px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  & > li a span.icon {
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  & > li a span.desc {
    display: none;
  }
  & > li a:hover {
  }
  & > li a:hover span.icon {
    left: 0px;
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  & > li.twitter a span.icon {
    background-image: url(/static/twitter-retina-white.png);
    background-size: 32px 32px;
  }
  & > li.github a span.icon {
    background-image: url(/static/github-retina-white.png);
    background-size: 32px 32px;
  }
`;

const SiteNetwork: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement>
> = props => (
  <UlWrapper {...filterHtmlProps(props)}>
    <li className="twitter">
      <a href="https://twitter.com/topheman" title="@topheman on twitter">
        <span className="icon" />
        <span className="desc">Twitter</span>
      </a>
    </li>
    <li className="github">
      <a
        href="https://github.com/topheman/nextjs-movie-browser"
        title="Fork on github"
      >
        <span className="icon" />
        <span className="desc">Github</span>
      </a>
    </li>
  </UlWrapper>
);

export default SiteNetwork;
