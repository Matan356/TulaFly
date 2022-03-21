import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Button,
  IconButton,
  ListItemButton,
  ListSubheader,
} from "@mui/material";

import ListSharpIcon from "@mui/icons-material/ListSharp";
import { Link } from "react-router-dom";

const BackDrawer = (props) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List
          sx={{ width: "30vh" }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              NAVIGATION NAV - BAR
            </ListSubheader>
          }
        >
          <ListItem disablePadding >
            <ListItemButton divider>
            <Link style={{
                textDecoration: "none",
                color:'black'

              }} to='/auth'><ListItemText primary="SIGN UP" inset /></Link>
            </ListItemButton>
          </ListItem>{" "}
          <ListItem disablePadding>
            <ListItemButton divider>
              <Link style={{
                textDecoration: "none",
                color:'black'

              }} to='/cart'><ListItemText primary="MY CART" inset /></Link>
              
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton divider>
              
            <Link style={{
                textDecoration: "none",
                color:'black'

              }} to='/about'><ListItemText primary="ABOUT US" inset /></Link>              
            </ListItemButton>
          </ListItem>
          <Button
            sx={{
              color: "white",
              background: "black",
              ml: "3.7rem",
              marginTop: "1rem",
            }}
            variant="contained"
            component={Link}
            to="/"
          >
            LOG OUT
          </Button>
        </List>
      </nav>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={"left"}>
          <IconButton
            onClick={toggleDrawer("left", true)}
            color="inherit"
            aria-label="menu"
          >
            <ListSharpIcon
              sx={{
                fontSize: "3rem",
                border: "0.25rem solid white",
                padding: "1px",
                margin: "1px",
              }}
            />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BackDrawer;
