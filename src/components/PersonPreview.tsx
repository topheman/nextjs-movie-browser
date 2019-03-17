import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity, ComponentWithData } from "../@types";
import TextContent from "./TextContent";
import { Wrapper, Poster, Title, Content } from "./ui/LayoutPreview";

interface IProps extends ComponentWithData<TmdbPersonEntity> {
  t: i18next.TranslationFunction;
}

/**
 * Preview for Movie and Tv
 */
const MoviePreview: React.FunctionComponent<IProps> = ({ t, data }) => {
  return (
    <Wrapper backdrop_path={data.profile_path}>
      <section>
        <Poster poster_path={data.profile_path} />
        <Title dir="auto">{data.name}</Title>
        <Content>
          <h3>{t("person-label-biography")}</h3>
          <TextContent>{data.biography}</TextContent>
        </Content>
      </section>
    </Wrapper>
  );
};

export default withNamespaces("person")(MoviePreview);
