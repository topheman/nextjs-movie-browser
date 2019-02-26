import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

export default (props: any) => (
  <>
    <Head>
      <title key="title">{process.env.NEXTJS_APP_CLIENT_TITLE}</title>
    </Head>
    <Header />
    <main>{props.children}</main>
    <Footer fromFullYear={2019} />
  </>
);
