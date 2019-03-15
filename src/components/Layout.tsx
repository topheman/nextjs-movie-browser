import Head from "next/head";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const theme = {
  primary: "#900000",
  breakpoint: "640px",
  maxWidth: "920px",
  headerTopHeight: "60px",
  searchHeight: "35px"
};

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    font-family: Arial,sans-serif;
  }
  h1,h2,h3,h4,h5,h6,a {
    color: ${props => props.theme.primary};
  }
  main {
    margin-top: ${props =>
      `calc(${props.theme.headerTopHeight} + ${
        props.theme.searchHeight
      } + 10px)`};
    padding: 0 8px;
  }
`;

const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default (props: any) => (
  <>
    <Head>
      <title key="title">{process.env.NEXTJS_APP_CLIENT_TITLE}</title>
    </Head>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle theme={theme} />
        <Header />
        <main>{props.children}</main>
        <Footer fromFullYear={2019} />
      </Wrapper>
    </ThemeProvider>
  </>
);
