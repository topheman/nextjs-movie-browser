import styled from "styled-components";
import i18next from "i18next";
import { withNamespaces } from "../../i18n";

import Link from "./Link";
import { TmdbPersonMovieCredits, TmdbPersonTvCredits } from "../@types";
import { makeFilmography, AnyCreditsEntity } from "../utils/tmdb";

const Wrapper = styled.div`
  ul {
    padding: 0;
    list-style: none;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    margin: 0px 8px;
  }
`;

const DepartmentList = styled.ul``;

const FilmographyByDepartment = styled.ul`
  width: 100%;
  margin: 0;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  li {
    padding: 8px;
  }
`;

const FilmographyLineWrapper = styled.span`
  font-size: 0.95rem;
  .year {
    margin: 5px;
  }
  a {
    margin: 5px;
    text-decoration: none;
    font-weight: bold;
  }
  .explain {
    color: gray;
    margin: 5px;
  }
  .role {
    margin: 5px;
  }
`;

const FilmographyLine = ({
  t,
  tmdbEntity,
  department
}: {
  t: i18next.TranslationFunction;
  tmdbEntity: AnyCreditsEntity;
  department: string;
}) => {
  const year = (
    new Date(
      tmdbEntity.release_date || tmdbEntity.first_air_date || ""
    ).getFullYear() || ""
  ).toString();
  return (
    <FilmographyLineWrapper>
      <span className="year">{year}</span>
      <Link tmdbEntity={tmdbEntity}>
        <a>{tmdbEntity.name || tmdbEntity.title}</a>
      </Link>
      {(tmdbEntity.character || tmdbEntity.job) && (
        <>
          <span className="explain">
            {(department === "Acting" &&
              (tmdbEntity.episode_count
                ? t("person-filmography-tv-as", {
                    numberEpisodes: tmdbEntity.episode_count
                  })
                : t("person-filmography-as"))) ||
              "..."}
          </span>
          <span className="role">{tmdbEntity.character || tmdbEntity.job}</span>
        </>
      )}
    </FilmographyLineWrapper>
  );
};

interface Props {
  t: i18next.TranslationFunction;
  movie_credits?: TmdbPersonMovieCredits;
  tv_credits?: TmdbPersonTvCredits;
}

const Filmography: React.FunctionComponent<Props> = ({
  t,
  movie_credits,
  tv_credits,
  ...remainingProps
}) => {
  const filmography = makeFilmography({ movie_credits, tv_credits });
  let currentYear: string;
  return (
    <Wrapper {...remainingProps}>
      <DepartmentList>
        {Object.keys(filmography).map(department => {
          // Any way to have the translations for departments and jobs ?...
          return (
            <li key={department}>
              <h3>{department}</h3>
              <FilmographyByDepartment>
                {filmography[department].map(infos => {
                  let split = false;
                  const newYear = (
                    new Date(
                      infos.release_date || infos.first_air_date || ""
                    ).getFullYear() || ""
                  ).toString();
                  if (newYear !== currentYear) {
                    split = true;
                  }
                  currentYear = newYear;
                  return (
                    <li
                      key={infos.id}
                      style={{
                        borderTop: split ? "1px solid #dedede" : "none"
                      }}
                    >
                      <FilmographyLine
                        tmdbEntity={infos}
                        t={t}
                        department={department}
                      />
                    </li>
                  );
                })}
              </FilmographyByDepartment>
            </li>
          );
        })}
      </DepartmentList>
    </Wrapper>
  );
};

export default withNamespaces("person")(Filmography);
