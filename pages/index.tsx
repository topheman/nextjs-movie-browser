import i18next from "i18next";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";

const Home = ({ t }: { t: i18next.TranslationFunction }) => (
  <Layout>
    <h1>{t("home-title")}</h1>
    <p>{t("home-content")}</p>
  </Layout>
);

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ["home", "common"]
  };
};

export default withNamespaces("home")(Home);
