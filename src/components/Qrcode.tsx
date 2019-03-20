import React from "react";

import Link from "./Link";
import HomeIcon from "./ui/HomeIcon";
import { MainWrapper } from "./ui/Layout";

const Qrcode: React.FunctionComponent = () => {
  return (
    <>
      <MainWrapper>
        <section
          style={{ marginTop: 130, marginBottom: 40, textAlign: "center" }}
        >
          <p>
            <Link href={{ pathname: "/" }} as="/">
              <a>
                <HomeIcon style={{ margin: "0 7px -7px 0px" }} />
                Back to Home page
              </a>
            </Link>
          </p>
          <p>
            <img src="/static/qrcode.png" />
          </p>
          <p>
            <a href="https://topheman-movie-browser.herokuapp.com/">
              https://topheman-movie-browser.herokuapp.com/
            </a>
          </p>
        </section>
      </MainWrapper>
    </>
  );
};

export default Qrcode;
