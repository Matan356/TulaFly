import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import HeaderBackground from "../../../assets/images/sky-clouds-rain.jpg";

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
          }}
        >
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
