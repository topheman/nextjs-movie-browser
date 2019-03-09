import { useEffect } from "react";
import { inject, observer } from "mobx-react";

import Layout from "../src/components/Layout";
import About from "../src/components/About";
import { withNamespaces } from "../i18n";
import TranslationsStore from "../src/stores/TranslationsStore";
import withBlankWrapper from "../src/components/with-blank-wrapper";

const AboutPage = ({
  translationsStore
}: {
  translationsStore: TranslationsStore;
}) => {
  // this page shouldn't expose translations, so reset them
  useEffect(() => {
    translationsStore.resetTranslations();
  }, []);
  return (
    <Layout>
      <About />
    </Layout>
  );
};

AboutPage.getInitialProps = async () => {
  return {
    namespacesRequired: ["about", "common"]
  };
};

export default withNamespaces("about")(
  inject("translationsStore")(observer(withBlankWrapper(AboutPage)))
);
