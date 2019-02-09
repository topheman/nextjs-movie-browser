import { useEffect } from "react";
import i18next from "i18next";
import { inject, observer } from "mobx-react";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";
import TranslationsStore from "../src/stores/TranslationsStore";
import withBlankWrapper from "../src/utils/with-blank-wrapper";

const About = ({
  t,
  translationsStore
}: {
  t: i18next.TranslationFunction;
  translationsStore: TranslationsStore;
}) => {
  // this page shouldn't expose translations, so reset them
  useEffect(() => {
    translationsStore.resetTranslations();
  }, []);
  return (
    <Layout>
      <h1>{t("about-title")}</h1>
      <p>{t("about-content")}</p>
    </Layout>
  );
};

About.getInitialProps = async () => {
  return {
    namespacesRequired: ["about", "common"]
  };
};

export default withNamespaces("about")(
  inject("translationsStore")(observer(withBlankWrapper(About)))
);
