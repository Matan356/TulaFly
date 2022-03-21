import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HeaderBackground from '../../../assets/images/sky-clouds-rain.jpg'

const Footer = (props) => {
  return (
      <React.Fragment >
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0 ,backgroundImage:`url(${HeaderBackground})`}}
        >
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </React.Fragment>
  );
};

export default Footer;
