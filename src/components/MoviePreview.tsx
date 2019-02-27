import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity } from "../@types";
import TextContent from "./TextContent";
import Link from "./Link";

type IProps = TmdbMovieEntity & {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
};

const MoviePreview = ({ t, mode, media_type, ...movie }: IProps) => {
  return (
    <>
      <h2 dir="auto">
        {mode === "preview" && (
          <Link tmdbEntity={{ ...movie, media_type }}>
            <a>👈</a>
          </Link>
        )}
        {movie.title || (movie as any).name}{" "}
        {movie.release_date &&
          `(${new Date(movie.release_date).getFullYear()})`}
      </h2>
      {mode === "full" && (
        <>
          <h3>{t("movie-label-synopsis")}</h3>
          <TextContent dir="auto">{movie.overview}</TextContent>
        </>
      )}
    </>
  );
};

MoviePreview.defaultProps = {
  mode: "full"
};

export default withNamespaces("movie")(MoviePreview);
