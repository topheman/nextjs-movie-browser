// Based on https://github.com/topheman/npm-registry-browser/blob/master/src/components/Footer.js

import React from "react";
import classNames from "classnames";

import { filterHtmlProps } from "../utils/helpers";

interface FooterProps {
  fromFullYear: number;
  toFullYear?: number;
  className?: string;
}

const Footer: React.FunctionComponent<FooterProps> = ({
  fromFullYear,
  toFullYear,
  className,
  ...remainingProps
}) => (
  <footer
    className={classNames(className)}
    {...filterHtmlProps(remainingProps)}
  >
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
  </footer>
);

Footer.defaultProps = {
  toFullYear: new Date().getFullYear(),
  className: undefined
};

export default Footer;
