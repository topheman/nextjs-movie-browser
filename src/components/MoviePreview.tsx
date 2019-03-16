import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, ComponentWithData, TmdbTvEntity } from "../@types";
import TextContent from "./TextContent";
import Link from "./Link";
import MainWrapper from "./ui/MainWrapper";
import { makeImageTmdbUrl, makeCrewListWithJobs } from "../utils/tmdb";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
}

const Wrapper = styled(MainWrapper)<{ backdrop_path: string }>`
  background-image: linear-gradient(
      rgba(255, 238, 238, 0.9),
      rgba(255, 238, 238, 0.9)
    ),
    url(${props =>
      makeImageTmdbUrl(props.backdrop_path, "w1400_and_h450_face")});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  &::before {
    filter: opacity(100) grayscale(100%) contrast(130%);
  }
  section {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "poster title"
      "poster content"
      "poster .";
    padding: 20px 0px;
  }
`;

const Poster = styled.div<{ poster_path: string }>`
  grid-area: poster;
  width: 300px;
  height: 450px;
  display: block;
  background-image: url(${props =>
    makeImageTmdbUrl(props.poster_path, "w300")});
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    width: 200px;
    height: 300px;
    background-image: url(${props =>
      makeImageTmdbUrl(props.poster_path, "w200")});
  }
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0px;
  padding: 0 8px 0 20px;
`;

const Content = styled.div`
  grid-area: content;
  margin: 0px;
  padding: 0 8px 0 20px;
`;

const CrewList = styled.ol`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  list-style: none;
  color: ${props => props.theme.primary};
  li {
    width: 33%;
    flex-basis: 33%;
    text-align: left;
  }
  p {
    margin: 0.5em 0;
  }
  a {
    font-weight: bold;
    text-decoration: none;
  }
  .jobs {
    font-size: 0.9em;
  }
`;

/**
 * Preview for Movie and Tv
 */
const MoviePreview: React.FunctionComponent<IProps> = ({
  t,
  mode,
  media_type,
  data
}) => {
  const crewListWithJobs = makeCrewListWithJobs(
    (data.credits && data.credits.crew) || []
  );
  return (
    <Wrapper backdrop_path={data.backdrop_path}>
      <section>
        <Poster poster_path={data.poster_path} />
        <Title dir="auto" data-testid="movie-preview-title">
          {mode === "preview" && (
            <Link tmdbEntity={{ ...data, media_type }}>
              <a>👈</a>
            </Link>
          )}
          {(data as TmdbMovieEntity).title || (data as TmdbTvEntity).name}{" "}
          {(data as TmdbMovieEntity).release_date &&
            `(${new Date(
              (data as TmdbMovieEntity).release_date
            ).getFullYear()})`}
        </Title>
        <Content>
          <h3 data-testid="movie-preview-title-synopsis">
            {t("movie-label-synopsis")}
          </h3>
          <TextContent>{data.overview}</TextContent>
          {crewListWithJobs.length > 0 && (
            <>
              <h3>{t("movie-label-featured-crew")}</h3>
              <CrewList>
                {crewListWithJobs
                  .filter((_, index) => index < 6)
                  .map(person => (
                    <li key={person.id}>
                      <p>
                        <Link tmdbEntity={{ ...person, media_type: "person" }}>
                          <a>{person.name}</a>
                        </Link>
                      </p>
                      <p className="jobs">{person.jobs.join(", ")}</p>
                    </li>
                  ))}
              </CrewList>
            </>
          )}
        </Content>
      </section>
    </Wrapper>
  );
};

MoviePreview.defaultProps = {
  mode: "full"
};

export default withNamespaces("movie")(MoviePreview);
