import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbMovieEntity, ComponentWithData, TmdbTvEntity } from "../@types";
import TextContent from "./TextContent";
import Link from "./Link";
import { makeImageTmdbUrl } from "../utils/tmdb";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  mode: "preview" | "full";
  media_type: "movie" | "tv";
}

const Wrapper = styled.div`
  top: 0;
  left: 0;
  padding: 0;
  background-color: ${props => props.theme.primary}40;
  section {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "poster title"
      "poster content"
      "poster .";
    padding: 20px 0px;
    margin: 0 auto;
    max-width: ${props => props.theme.maxWidth};
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    section {
      padding: 1px 8px;
    }
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

/**
 * Preview for Movie and Tv
 */
const MoviePreview: React.FunctionComponent<IProps> = ({
  t,
  mode,
  media_type,
  data
}) => {
  return (
    <Wrapper>
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
          {mode === "full" && (
            <>
              <h3 data-testid="movie-preview-title-synopsis">
                {t("movie-label-synopsis")}
              </h3>
              <TextContent>{data.overview}</TextContent>
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
