import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #fff8f8;
    font-family: Arial,sans-serif;
  }
  main {
    margin-top: 90px;
    padding: 0 8px;
  }
`;

const Wrapper = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;

export default (props: any) => (
  <>
    <Head>
      <title key="title">{process.env.NEXTJS_APP_CLIENT_TITLE}</title>
    </Head>
    <Wrapper>
      <GlobalStyle />
      <Header />
      <main>{props.children}</main>
      <Footer fromFullYear={2019} />
    </Wrapper>
  </>
);
