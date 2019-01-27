import i18next from "i18next";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";

const About = ({ t }: { t: i18next.TranslationFunction }) => (
  <Layout>
    <h1>{t("about-title")}</h1>
    <p>{t("about-content")}</p>
  </Layout>
);

About.getInitialProps = async () => {
  return {
    namespacesRequired: ["about", "common"]
  };
};

export default withNamespaces("about")(About);
