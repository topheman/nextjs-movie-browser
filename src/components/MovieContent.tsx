import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, TmdbTvEntity, ComponentWithData } from "../@types";
import Link from "./Link";
import CastingCardFull from "./CastingCardFull";
import TvSeasonCardFull from "./TvSeasonCardFull";
import MovieInfosCardFull from "./MovieInfosCardFull";

const Wrapper = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  --infos-width: 200px;
  --casting-width: calc(${props => props.theme.maxWidth} - var(--infos-width));
`;

const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-content: flex-start;
  section {
    padding-top: 40px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    display: grid;
    grid-template-areas: "casting" "infos";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Casting = styled.div`
  width: calc(
    (100vw - ${props => props.theme.maxWidth}) / 2 + var(--casting-width)
  );
  min-height: calc(100vh - 795px);
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-right: 40px;
  padding-bottom: 40px;
  box-sizing: border-box;
  section {
    display: block;
    width: calc(var(--casting-width) - 40px);
  }
  a.full-casting {
    width: 100%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: casting;
    width: 100vw;
    padding-right: 0;
    padding-bottom: 30px;
    section  {
      padding-top: 10px;
      width: 100vw;
    }
    section > h3,
    section > a {
      padding: 0 8px;
    }
  }
`;

const Infos = styled.div`
  background-color: #fff3f3;
  width: calc(
    (100vw - ${props => props.theme.maxWidth}) / 2 + var(--infos-width)
  );
  padding-left: 40px;
  padding-bottom: 40px;
  box-sizing: border-box;
  display: flex;
  section {
    width: var(--infos-width);
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: infos;
    width: 100vw;
    padding: 0 8px;
    section {
      width: 100%;
      padding-top: 8px;
    }
  }
`;

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
                <TvSeasonCardFull
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
