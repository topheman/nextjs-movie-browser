import styled from "styled-components";

import { MainWrapper } from "./Layout";
import { makeImageTmdbUrl } from "../../utils/tmdb";

export const Wrapper = styled(MainWrapper)<{ backdrop_path: string }>`
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
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    width: 100vw;
    background-image: url(${props =>
      makeImageTmdbUrl(props.backdrop_path, "w500_and_h282_face")});
    background-size: contain;
    background-position: 0 0;
    section {
      display: block;
    }
  }
`;

export const Poster = styled.div<{ poster_path: string }>`
  grid-area: poster;
  width: 300px;
  height: 450px;
  display: block;
  background-image: url(${props =>
    makeImageTmdbUrl(props.poster_path, "w300")});
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: none;
    width: 80px;
    height: 120px;
    margin-top: 90px;
    margin-left: 20px;
    background-image: url(${props =>
      makeImageTmdbUrl(props.poster_path, "w200")});
    background-size: contain;
  }
`;

export const Title = styled.h2`
  grid-area: title;
  margin: 0px;
  padding: 0 8px 0 20px;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: none;
    margin-top: -40px;
    margin-left: 90px;
  }
`;

export const Content = styled.div`
  grid-area: content;
  margin: 0px;
  padding: 0 8px 0 20px;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: none;
    padding: 0 8px;
    margin: 30px 0px 0px;
  }
`;
