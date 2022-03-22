import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import HeaderBackground from "../../../assets/blue-sky-reflection_157744-345.webp";
const Header = (props) => {
  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            overflow: "hidden",
            maxWidth: "100%",
            height: "15%",
            backgroundImage: `url(${HeaderBackground})`,
            backgroundSize:'cover'
          }}
        >
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
