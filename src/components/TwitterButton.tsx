/**
 * inspired by https://github.com/topheman/d3-react-experiments/blob/master/src/components/TwitterButton/TwitterButton.js
 * and https://github.com/topheman/react-fiber-experiments/blob/master/src/components/TwitterButton.js
 */

import React from "react";

interface Props {
  size?: "l" | "large";
  lang?: string;
  dnt?: boolean; // privacy policy ("dnt" as "do not track")
  text?: string;
  url?: string;
  hashtags?: string;
  via?: string;
  related?: string;
  buttonTitle?: string;
  style?: React.CSSProperties;
}

/**
 * This component renders directly the iframe of twitter without running external script
 * to avoid messing up with react's internal DOM and break react hot loader
 *
 * @param {String} size
 * @param {String} lang
 * @param {Boolean} dnt
 * @param {String} text
 * @param {String} url
 * @param {String} hashtags
 * @param {String} via
 * @param {String} related
 * @param {String} buttonTitle
 */
const TwitterButton: React.FunctionComponent<Props> = props => {
  const {
    size,
    lang,
    dnt,
    text,
    url,
    hashtags,
    via,
    related,
    buttonTitle,
    style,
    ...remainingProps
  } = props;
  const params = [
    `size=${size}`,
    "count=none",
    `dnt=${dnt}`,
    `lang=${lang}`,
    (typeof text !== "undefined" && `text=${encodeURIComponent(text)}`) ||
      undefined,
    (typeof url !== "undefined" && `url=${encodeURIComponent(url)}`) ||
      undefined,
    (typeof hashtags !== "undefined" &&
      `hashtags=${encodeURIComponent(hashtags)}`) ||
      undefined,
    (typeof via !== "undefined" && `via=${encodeURIComponent(via)}`) ||
      undefined,
    (typeof related !== "undefined" &&
      `related=${encodeURIComponent(related)}`) ||
      undefined
  ]
    .filter(item => item !== undefined)
    .join("&");
  const mergedStyles = {
    border: 0,
    overflow: "hidden",
    ...style
  };
  return (
    <iframe
      width="78px"
      height="28px"
      title={buttonTitle}
      style={mergedStyles}
      scrolling="no"
      src={`https://platform.twitter.com/widgets/tweet_button.html?${params}`}
      {...remainingProps}
    />
  );
};

TwitterButton.defaultProps = {
  size: "l",
  lang: "en",
  dnt: false,
  buttonTitle: "Twitter Tweet Button",
  text: undefined,
  url: undefined,
  hashtags: undefined,
  via: undefined,
  related: undefined,
  style: undefined
};

export default TwitterButton;
