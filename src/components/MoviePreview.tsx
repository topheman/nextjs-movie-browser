import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, ComponentWithData, TmdbTvEntity } from "../@types";
import TextContent from "./TextContent";
import Link from "./Link";
import { Wrapper, Poster, Title, Content } from "./ui/LayoutPreview";
import { makeCrewListWithJobs } from "../utils/tmdb";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
}

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
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    li {
      width: 50%;
      flex-basis: 50%;
    }
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
