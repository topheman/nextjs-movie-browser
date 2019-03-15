// Based on https://github.com/topheman/npm-registry-browser/blob/master/src/components/Footer.js

import React from "react";
import styled from "styled-components";

import { filterHtmlProps } from "../utils/helpers";

const Wrapper = styled.footer`
  text-align: center;
`;

interface FooterProps {
  fromFullYear: number;
  toFullYear?: number;
}

const Footer: React.FunctionComponent<FooterProps> = ({
  fromFullYear,
  toFullYear,
  ...remainingProps
}) => (
  <Wrapper {...filterHtmlProps(remainingProps)}>
    <p>
      ©
      {fromFullYear === toFullYear
        ? toFullYear
        : `${fromFullYear}-${toFullYear}`}{" "}
      <a href="http://labs.topheman.com/">labs.topheman.com</a> - Christophe
      Rosset - v{process.env.NEXTJS_APP_CLIENT_METADATAS_VERSION}
    </p>
    <p>
      This product uses the{" "}
      <a href="https://www.themoviedb.org/documentation/api/terms-of-use">
        TMDb API
      </a>{" "}
      but is not endorsed or certified by TMDb.
    </p>
  </Wrapper>
);

Footer.defaultProps = {
  toFullYear: new Date().getFullYear()
};

export default Footer;
