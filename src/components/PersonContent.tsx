import React from "react";
import i18next from "i18next";
import styled from "styled-components";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity, ComponentWithData } from "../@types";
import { Wrapper, ColumnWrapper, Casting, Infos } from "./ui/LayoutContent";
import PopularCreditCard from "./PopularCreditCard";
import { makeCreditsList } from "../utils/tmdb";

interface IProps extends ComponentWithData<TmdbPersonEntity> {
  t: i18next.TranslationFunction;
  media_type: "person";
}

const PopularCreditsList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    overflow: hidden;
    overflow-x: scroll;
    flex-wrap: initial;
    li {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
`;

const MovieContent: React.FunctionComponent<IProps> = ({
  // t,
  // media_type,
  data
}) => {
  const popularCredits = makeCreditsList(
    {
      movie_credits: data.movie_credits,
      tv_credits: data.tv_credits
    },
    8
  );
  return (
    <Wrapper>
      <ColumnWrapper>
        <Casting>
          <section>
            <PopularCreditsList>
              {popularCredits.map(credit => (
                // @ts-ignore
                <PopularCreditCard key={credit.id} data={credit} as="li" />
              ))}
            </PopularCreditsList>
          </section>
        </Casting>
        <Infos>
          <section>Infos</section>
        </Infos>
      </ColumnWrapper>
    </Wrapper>
  );
};

export default withNamespaces("movie")(MovieContent);
