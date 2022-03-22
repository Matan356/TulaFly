import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HeaderBackground from '../../../assets/blue-sky-reflection_157744-345.webp'
// blue-sky-clouds_1417-1850.webp // not 
// blue-sky-reflection_157744-345.webp // not
const Footer = (props) => {
  return (
      <React.Fragment >
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0 ,backgroundImage:`url(${HeaderBackground})` ,backgroundSize:'cover'}}
        >
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </React.Fragment>
  );
};

export default Footer;
