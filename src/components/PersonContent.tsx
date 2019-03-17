import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity, ComponentWithData } from "../@types";
import { Wrapper, ColumnWrapper, Casting, Infos } from "./ui/LayoutContent";

interface IProps extends ComponentWithData<TmdbPersonEntity> {
  t: i18next.TranslationFunction;
  media_type: "person";
}

const MovieContent: React.FunctionComponent<IProps> = (
  {
    // t,
    // media_type,
    // data
  }
) => {
  return (
    <Wrapper>
      <ColumnWrapper>
        <Casting>
          <section>Casting</section>
        </Casting>
        <Infos>
          <section>Infos</section>
        </Infos>
      </ColumnWrapper>
    </Wrapper>
  );
};

export default withNamespaces("movie")(MovieContent);
