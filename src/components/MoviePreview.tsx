import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import TextContent from "./TextContent";

const MoviePreview = ({
  t,
  title,
  overview
}: {
  t: i18next.TranslationFunction;
  title: string;
  overview: string;
}) => {
  return (
    <>
      <h2 dir="auto">{title}</h2>
      <h3>{t("movie-label-synopsis")}</h3>
      <TextContent dir="auto">{overview}</TextContent>
    </>
  );
};

export default withNamespaces("movie")(MoviePreview);
