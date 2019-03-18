import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbTvEntity, ComponentWithData } from "../@types";
import { MainWrapper } from "./ui/Layout";
import TextContent from "./TextContent";

interface IProps extends ComponentWithData<TmdbTvEntity> {
  t: i18next.TranslationFunction;
}

const SeasonList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TvSeasons: React.FunctionComponent<IProps> = ({ t, data }) => {
  return (
    <MainWrapper>
      <section>
        {data.seasons && data.seasons.length > 0 && (
          <SeasonList>
            {data.seasons.map(season => (
              <li key={season.id}>
                <h3>
                  <span dir="auto">{season.name}</span>{" "}
                  <span style={{ fontSize: "0.8em" }}>
                    {new Date(season.air_date).getFullYear()}
                  </span>
                  {" | "}
                  <span style={{ fontSize: "0.8em" }}>
                    {t("movie-label-episode-count", {
                      count: season.episode_count
                    })}
                  </span>
                </h3>
                <TextContent>{season.overview}</TextContent>
              </li>
            ))}
          </SeasonList>
        )}
      </section>
    </MainWrapper>
  );
};

export default withNamespaces("movie")(TvSeasons);
