import styled from "styled-components";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbTvEntity, TmdbMovieEntity, ComponentWithData } from "../@types";
import { filterHtmlProps } from "../utils/helpers";

const Wrapper = styled.div`
  font-size: 0.9rem;
  line-height: 1.3rem;
  h4 {
    font-size: 1.2rem;
  }
  strong {
    font-size: 1.1em;
  }
`;

const WordsList = styled.ul`
  list-style: none;
  padding: 0px;
  font-style: italic;
  li {
    display: inline-block;
    &:after {
      content: ",";
      margin-right: 0.25em;
    }
  }
  li:last-child {
    &:after {
      content: "";
    }
  }
`;

interface IProps extends ComponentWithData<TmdbTvEntity & TmdbMovieEntity> {
  t: i18next.TranslationFunction;
  tmdbEntity: TmdbTvEntity & TmdbMovieEntity;
}

const TvSeasonCardFull: React.FunctionComponent<IProps> = ({
  t,
  tmdbEntity,
  ...remainingProps
}) => {
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <h4 style={{ marginTop: 0 }}>{t("movie-infos-label-facts")}</h4>
      <p>
        <strong>{t("movie-infos-label-original-title")}</strong>{" "}
        {tmdbEntity.original_name || tmdbEntity.original_title}
      </p>
      <p>
        <strong>{t("movie-infos-label-status")}</strong>{" "}
        {t(
          `movie-status-${tmdbEntity.status.toLowerCase().replace(/ /g, "-")}`
        )}
      </p>
      {tmdbEntity.release_date && (
        <p>
          <strong>{t("movie-infos-label-release-infos")}</strong>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: t("movie-date", {
                date: new Date(tmdbEntity.release_date)
              })
            }}
          />
        </p>
      )}
      {tmdbEntity.runtime && (
        <p>
          <strong>{t("movie-infos-label-runtime")}</strong> {tmdbEntity.runtime}
          mins
        </p>
      )}
      {tmdbEntity.budget && (
        <p>
          <strong>{t("movie-infos-label-budget")}</strong>{" "}
          {t("movie-currency", { amount: tmdbEntity.budget })}
        </p>
      )}
      {tmdbEntity.revenue && (
        <p>
          <strong>{t("movie-infos-label-revenue")}</strong>{" "}
          {t("movie-currency", { amount: tmdbEntity.revenue })}
        </p>
      )}
      {tmdbEntity.genres && tmdbEntity.genres.length > 0 && (
        <>
          <h4 style={{ marginBottom: 15 }}>{t("movie-infos-label-genres")}</h4>
          <WordsList>
            {tmdbEntity.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </WordsList>
        </>
      )}
      {tmdbEntity.keywords &&
        tmdbEntity.keywords.keywords &&
        tmdbEntity.keywords.keywords.length > 0 && (
          <>
            <h4 style={{ marginBottom: 15 }}>
              {t("movie-infos-label-keywords")}
            </h4>
            <WordsList>
              {tmdbEntity.keywords.keywords.map(keyword => (
                <li key={keyword.id}>{keyword.name}</li>
              ))}
            </WordsList>
          </>
        )}
    </Wrapper>
  );
};

export default withNamespaces(["movie", "common"])(TvSeasonCardFull);
