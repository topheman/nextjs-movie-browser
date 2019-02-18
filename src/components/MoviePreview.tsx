import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity } from "../@types";
import TextContent from "./TextContent";

type IProps = TmdbMovieEntity & { t: i18next.TranslationFunction };

const MoviePreview = ({ t, ...movie }: IProps) => {
  console.log(movie);
  return (
    <>
      <h2 dir="auto">
        {movie.title}{" "}
        {movie.release_date &&
          `(${new Date(movie.release_date).getFullYear()})`}
      </h2>
      <h3>{t("movie-label-synopsis")}</h3>
      <TextContent dir="auto">{movie.overview}</TextContent>
    </>
  );
};

export default withNamespaces("movie")(MoviePreview);
