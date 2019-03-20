import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Drawer from "./Drawer";
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
  h1,h2,h3,h4,h5,h6,a,strong {
    color: ${props => props.theme.primary};
  }
  main {
    position: relative;
    top: 0;
    left: 0;
    padding: 0;
    margin-top: ${props =>
      `calc(${props.theme.headerTopHeight} + ${props.theme.searchHeight})`};
  }
`;

interface Props {
  currentUrl: string;
}

const Layout: React.FunctionComponent<Props> = props => (
  <>
    <Head>
      <title key="title">{process.env.NEXTJS_APP_CLIENT_TITLE}</title>
    </Head>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle theme={theme} />
        <Drawer>
          <Header />
          <main>{props.children}</main>
          <Footer fromFullYear={2019} currentUrl={props.currentUrl} />
        </Drawer>
      </>
    </ThemeProvider>
  </>
);

export default Layout;
