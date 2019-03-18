import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, TmdbTvEntity, ComponentWithData } from "../@types";
import { Wrapper, ColumnWrapper, Casting, Infos } from "./ui/LayoutContent";
import Link from "./Link";
import CastingCardFull from "./CastingCardFull";
import TvSeasonCardFull from "./TvSeasonCardFull";
import MovieInfosCardFull from "./MovieInfosCardFull";

const CastingList = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  overflow: hidden;
  overflow-x: scroll;
  li {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

const TvSeasonCardFullStyled = styled(TvSeasonCardFull)`
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    flex-wrap: initial;
  }
`;

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  media_type: "movie" | "tv";
}

const MovieContent: React.FunctionComponent<IProps> = ({
  t,
  media_type,
  data
}) => {
  let currentSeason;
  if (
    media_type === "tv" &&
    data.last_episode_to_air &&
    data.last_episode_to_air.season_number &&
    data.seasons
  ) {
    currentSeason = data.seasons.find(
      season => season.season_number === data.last_episode_to_air.season_number
    );
  }
  return (
    <Wrapper>
      <ColumnWrapper>
        <Casting>
          <section>
            {data.credits.cast && data.credits.cast.length > 0 && (
              <>
                <h3 dir="auto" style={{ marginTop: 0 }}>
                  {t("movie-label-cast")}
                </h3>
                <CastingList>
                  {data.credits.cast
                    .filter((_, index) => index < 6)
                    .map(person => (
                      // @ts-ignore
                      <CastingCardFull
                        key={person.credit_id}
                        person={person}
                        as="li"
                      />
                    ))}
                </CastingList>
                <Link tmdbEntity={{ media_type, ...data }} subcategory="cast">
                  <a className="full-casting">
                    {t("movie-label-full-casting")}
                  </a>
                </Link>
              </>
            )}
            {currentSeason && (
              <>
                <h3 dir="auto">{t("movie-label-current-season")}</h3>
                <TvSeasonCardFullStyled
                  season={currentSeason}
                  style={{ marginBottom: 15 }}
                />
                <Link
                  tmdbEntity={{ media_type: "tv", ...data }}
                  subcategory="seasons"
                >
                  <a>{t("movie-label-all-seasons")}</a>
                </Link>
              </>
            )}
          </section>
        </Casting>
        <Infos>
          <section>
            <MovieInfosCardFull tmdbEntity={data} />
          </section>
        </Infos>
      </ColumnWrapper>
    </Wrapper>
  );
};

export default withNamespaces("movie")(MovieContent);
