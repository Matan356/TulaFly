import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { IconButton,AppBar, Toolbar,CssBaseline} from "@material-ui/core";
import useStyles from "./nav-styles";


export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar >
          <IconButton href="https://github.com/Matan356" >
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/matan-elgrabli/">
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
