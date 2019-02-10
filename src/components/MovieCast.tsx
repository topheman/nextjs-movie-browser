import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbCredits } from "../@types";

const MovieCast = ({
  t,
  credits
}: {
  t: i18next.TranslationFunction;
  credits: TmdbCredits;
}) => {
  return (
    <>
      <h3>{t("movie-label-cast")}</h3>
      {credits.cast && (
        <ul>
          {credits.cast.map(person => (
            <li key={person.cast_id}>{person.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default withNamespaces("movie")(MovieCast);
