import styled from "styled-components";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { MainWrapper } from "./ui/Layout";
import Link from "./Link";
import { filterHtmlProps } from "../utils/helpers";
import { makeImageTmdbUrl } from "../utils/tmdb";
import { ComponentWithData, TmdbMovieEntity, TmdbTvEntity } from "../@types";

interface IProps extends ComponentWithData<TmdbMovieEntity & TmdbTvEntity> {
  t: i18next.TranslationFunction;
  media_type: "movie" | "tv";
}

const WrapperStyled = styled(MainWrapper)`
  padding: 10px 0px;
  section {
    display: flex;
    > a {
      margin-right: 10px;
    }
  }
  h2 {
    margin-bottom: 10px;
  }
`;

const SimpleBanner: React.FunctionComponent<IProps> = ({
  t,
  media_type,
  data,
  ...remainingProps
}) => (
  <WrapperStyled {...filterHtmlProps(remainingProps)}>
    <section>
      <Link tmdbEntity={{ ...data, media_type }}>
        <a>
          <img src={makeImageTmdbUrl(data.poster_path, "w58_and_h87_face")} />
        </a>
      </Link>
      <span>
        <h2>
          {data.title || data.name}{" "}
          {((data as TmdbMovieEntity).release_date &&
            `(${new Date(
              (data as TmdbMovieEntity).release_date
            ).getFullYear()})`) ||
            ((data as TmdbTvEntity).first_air_date &&
              `(${new Date(
                (data as TmdbTvEntity).first_air_date
              ).getFullYear()})`)}
        </h2>
        <Link tmdbEntity={{ ...data, media_type }}>
          <a>👈 {t("common-label-back-mainpage")}</a>
        </Link>
      </span>
    </section>
  </WrapperStyled>
);

export default withNamespaces("common")(SimpleBanner);
