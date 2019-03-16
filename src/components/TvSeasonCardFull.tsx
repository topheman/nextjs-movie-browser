import styled from "styled-components";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbTvSeasonsEntity, ComponentWithData } from "../@types";
import { filterHtmlProps } from "../utils/helpers";
import { makeImageTmdbUrl } from "../utils/tmdb";
import TextContent from "./TextContent";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 450px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface IProps extends ComponentWithData<TmdbTvSeasonsEntity> {
  t: i18next.TranslationFunction;
  season: TmdbTvSeasonsEntity;
}

const TvSeasonCardFull: React.FunctionComponent<IProps> = ({
  t,
  season,
  ...remainingProps
}) => {
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <img
        width={140}
        height={210}
        src={season.poster_path && makeImageTmdbUrl(season.poster_path, "w200")}
      />
      <Content>
        <div>
          <h2>{season.name}</h2>
          <h4>
            {new Date(season.air_date).getFullYear()} |{" "}
            {t("movie-label-episode-count", {
              count: season.episode_count
            })}
          </h4>
          <TextContent>{season.overview}</TextContent>
        </div>
      </Content>
    </Wrapper>
  );
};

export default withNamespaces("movie")(TvSeasonCardFull);
