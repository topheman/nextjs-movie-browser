import styled from "styled-components";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity } from "../@types";
import { filterHtmlProps } from "../utils/helpers";
import { makeCreditsList } from "../utils/tmdb";

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

const NickNameList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

interface IProps {
  t: i18next.TranslationFunction;
  tmdbEntity: TmdbPersonEntity;
}

const PersonInfosCardFull: React.FunctionComponent<IProps> = ({
  t,
  tmdbEntity,
  ...remainingProps
}) => {
  const creditsList = makeCreditsList({
    movie_credits: tmdbEntity.movie_credits,
    tv_credits: tmdbEntity.tv_credits
  });
  console.log(creditsList);
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <h4 dir="auto" style={{ marginTop: 0 }}>
        {t("person-label-personal-info")}
      </h4>
      {tmdbEntity.known_for_department && (
        <p dir="auto">
          <strong>{t("person-label-known-for")}</strong>{" "}
          {tmdbEntity.known_for_department}
        </p>
      )}
      <p dir="auto">
        <strong>{t("person-label-gender")}</strong>{" "}
        {t(`person-gender-${tmdbEntity.gender}`)}
      </p>
      <p dir="auto">
        <strong>{t("person-label-known-credits")}</strong> {creditsList.length}
      </p>
      {tmdbEntity.birthday && (
        <p dir="auto">
          <strong>{t("person-label-birthday")}</strong>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: t("person-date", {
                date: new Date(tmdbEntity.birthday)
              })
            }}
          />
        </p>
      )}
      {tmdbEntity.place_of_birth && (
        <p dir="auto">
          <strong>{t("person-label-place-of-birth")}</strong>{" "}
          {tmdbEntity.place_of_birth}
        </p>
      )}
      {tmdbEntity.also_known_as && (
        <>
          <p dir="auto">
            <strong>{t("person-label-also-known-as")}</strong>{" "}
          </p>
          <NickNameList>
            {tmdbEntity.also_known_as.map(name => (
              <li dir="auto" key={name}>
                {name}
              </li>
            ))}
          </NickNameList>
        </>
      )}
    </Wrapper>
  );
};

export default withNamespaces("person")(PersonInfosCardFull);
