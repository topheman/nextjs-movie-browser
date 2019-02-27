import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbCredits } from "../@types";
import Link, { TmdbEntityMinimum } from "./Link";

type IProps = TmdbEntityMinimum & {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  credits: TmdbCredits;
};

const MovieCast = ({ t, mode, credits, ...tmdbEntity }: IProps) => {
  return (
    <>
      {credits.cast && credits.cast.length > 0 && (
        <>
          <h3>{t("movie-label-cast")}</h3>
          <ul>
            {credits.cast
              .filter((_, index) => {
                if (mode === "full" || (mode === "preview" && index < 5)) {
                  return true;
                }
                return false;
              })
              .map(person => (
                <li key={person.credit_id}>
                  <Link tmdbEntity={{ media_type: "person", ...person }}>
                    <a>{person.name}</a>
                  </Link>{" "}
                  <i>{person.character}</i>
                </li>
              ))}
          </ul>
        </>
      )}
      {credits.crew && credits.crew.length > 0 && (
        <>
          <h3>{t("movie-label-crew")}</h3>
          <ul>
            {credits.crew
              .filter((_, index) => {
                if (mode === "full" || (mode === "preview" && index < 5)) {
                  return true;
                }
                return false;
              })
              .map(person => (
                <li key={person.credit_id}>
                  <Link tmdbEntity={{ media_type: "person", ...person }}>
                    <a>{person.name}</a>
                  </Link>{" "}
                  {person.job} <i>({person.department})</i>
                </li>
              ))}
          </ul>
        </>
      )}
      {mode === "preview" && (
        <Link tmdbEntity={tmdbEntity} subcategory="cast">
          <a>{t("movie-label-full-casting")}</a>
        </Link>
      )}
    </>
  );
};

MovieCast.defaultProps = {
  mode: "full"
};

export default withNamespaces("movie")(MovieCast);
