import styled from "styled-components";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbTvEntity, TmdbMovieEntity } from "../@types";
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

interface IProps {
  t: i18next.TranslationFunction;
  tmdbEntity: TmdbTvEntity & TmdbMovieEntity;
}

const MovieInfosCardFull: React.FunctionComponent<IProps> = ({
  t,
  tmdbEntity,
  ...remainingProps
}) => {
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <h4 dir="auto" style={{ marginTop: 0 }}>
        {t("movie-infos-label-facts")}
      </h4>
      <p dir="auto">
        <strong>{t("movie-infos-label-original-title")}</strong>{" "}
        {tmdbEntity.original_name || tmdbEntity.original_title}
      </p>
      <p dir="auto">
        <strong>{t("movie-infos-label-status")}</strong>{" "}
        {t(
          `movie-status-${tmdbEntity.status.toLowerCase().replace(/ /g, "-")}`
        )}
      </p>
      {tmdbEntity.release_date && (
        <p dir="auto">
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
        <p dir="auto">
          <strong>{t("movie-infos-label-runtime")}</strong> {tmdbEntity.runtime}
          mins
        </p>
      )}
      {tmdbEntity.budget && (
        <p dir="auto">
          <strong>{t("movie-infos-label-budget")}</strong>{" "}
          {t("movie-currency", { amount: tmdbEntity.budget })}
        </p>
      )}
      {tmdbEntity.revenue && (
        <p dir="auto">
          <strong>{t("movie-infos-label-revenue")}</strong>{" "}
          {t("movie-currency", { amount: tmdbEntity.revenue })}
        </p>
      )}
      {tmdbEntity.genres && tmdbEntity.genres.length > 0 && (
        <>
          <h4 dir="auto" style={{ marginBottom: 15 }}>
            {t("movie-infos-label-genres")}
          </h4>
          <p dir="auto">
            {tmdbEntity.genres.map(genre => genre.name).join(", ")}
          </p>
        </>
      )}
      {tmdbEntity.keywords &&
        tmdbEntity.keywords.keywords &&
        tmdbEntity.keywords.keywords.length > 0 && (
          <>
            <h4 style={{ marginBottom: 15 }}>
              {t("movie-infos-label-keywords")}
            </h4>
            <p dir="auto">
              {tmdbEntity.keywords.keywords
                .map(keyword => keyword.name)
                .join(", ")}
            </p>
          </>
        )}
    </Wrapper>
  );
};

export default withNamespaces("movie")(MovieInfosCardFull);
