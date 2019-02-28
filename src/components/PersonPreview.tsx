import React from "react";
import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity, ComponentWithData } from "../@types";
import TextContent from "./TextContent";

interface IProps extends ComponentWithData<TmdbPersonEntity> {
  t: i18next.TranslationFunction;
}

const PersonPreview: React.FunctionComponent<IProps> = ({
  t,
  data
}: IProps) => {
  return (
    <>
      <h2 dir="auto">{data.name}</h2>
      <h3>{t("person-label-biography")}</h3>
      <TextContent dir="auto">{data.biography}</TextContent>
    </>
  );
};

export default withNamespaces("person")(PersonPreview);
