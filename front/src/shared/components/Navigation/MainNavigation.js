import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackDrawer from "../UIElements/BackDrawer";
import NavLinks from "./NavLinks";
import { Typography } from "@mui/material";
import { amber } from "@mui/material/colors";

import SocialMedia from "./SocialMedia";

const MainNavigation = () => {
  return (
    <React.Fragment>
      <header>
        <Header>
          <BackDrawer />
          <Typography
            variant="caption"
            fontSize="1.8rem"
            component="h1"
            alignSelf="center"
            alignContent="center"
            marginLeft="39%"
            marginTop="2%"
            paddingBottom="2rem"
            paddingTop="1rem"
          >
            <Link
              style={{
                padding: "15px",
                fontFamily: "-moz-initial",
                textDecoration: "none",
                color: amber["A100"],
                textShadow: "2.5px 1px black",
                border: "2px solid #ffe57f",
                borderRadius: "50%",
                boxShadow: "  15px 0px 75px 35px #ffe57f",
                overflow: 0,
              }}
              to="/"
            >
              TulaFly
            </Link>
          </Typography>
          <nav style={{textShadow: "1px 1px black", paddingLeft: "20rem" }}>
            <NavLinks
            />
          </nav>
        </Header>
      </header>

      <Footer>
        <SocialMedia />
      </Footer>
    </React.Fragment>
  );
};

export default MainNavigation;
