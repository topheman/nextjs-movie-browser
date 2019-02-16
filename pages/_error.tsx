import React from "react";
import { Response } from "express";

import { withNamespaces } from "../i18n";
import Layout from "../src/components/Layout";
import Error from "../src/components/Error";

class ErrorPage extends React.Component<{ statusCode: number }> {
  static getInitialProps({ res, err }: { res: Response; err: any }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, namespacesRequired: ["common"] };
  }

  render() {
    return (
      <Layout>
        <Error statusCode={this.props.statusCode} />
      </Layout>
    );
  }
}

export default withNamespaces("common")(ErrorPage);
