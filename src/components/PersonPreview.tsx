import i18next from "i18next";

import { withNamespaces } from "../../i18n";
import { TmdbPersonEntity } from "../@types";
import TextContent from "./TextContent";

type IProps = TmdbPersonEntity & { t: i18next.TranslationFunction };

const PersonPreview = ({ t, ...person }: IProps) => {
  return (
    <>
      <h2 dir="auto">{person.name}</h2>
      <h3>{t("person-label-biography")}</h3>
      <TextContent dir="auto">{person.biography}</TextContent>
    </>
  );
};

export default withNamespaces("person")(PersonPreview);
