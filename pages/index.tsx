import { useEffect } from "react";
import i18next from "i18next";
import { inject, observer } from "mobx-react";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";
import TranslationsStore from "../src/stores/TranslationsStore";
import withBlankWrapper from "../src/utils/with-blank-wrapper";

const Home = ({
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
      <h1>{t("home-title")}</h1>
      <p>{t("home-content")}</p>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ["home", "common"]
  };
};

export default withNamespaces("home")(
  inject("translationsStore")(observer(withBlankWrapper(Home)))
);
