import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { ComponentWithData, TmdbTvEntity } from "../@types";
import Link from "./Link";

interface IProps extends ComponentWithData<TmdbTvEntity> {
  t: i18next.TranslationFunction;
}

const CurrentSeason: React.FunctionComponent<IProps> = ({ t, data }) => {
  const lastEpisode = data.last_episode_to_air;
  return (
    <>
      <h2 dir="auto">{t("movie-label-current-season")}</h2>
      <div>
        <h3>
          {t("movie-label-season", { number: lastEpisode.season_number })}
        </h3>
      </div>
      <Link tmdbEntity={{ media_type: "tv", ...data }} subcategory="seasons">
        <a>{t("movie-label-all-seasons")}</a>
      </Link>
    </>
  );
};

export default withNamespaces("movie")(CurrentSeason);
