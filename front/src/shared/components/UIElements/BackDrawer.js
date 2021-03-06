import React, { useContext } from "react";
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
import { AuthContext } from "../../context/auth-context";

const BackDrawer = (props) => {
  const auth = useContext(AuthContext);

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
    <nav>
      <List
        sx={{ width: { xl: 300, md: 250, xs: 220 }, textAlign: "center" }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            NAVIGATION LIST
          </ListSubheader>
        }
      >
        {!auth.isLoggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton divider onClick={toggleDrawer("left", false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/auth"
                >
                  <ListItemText
                    primary="SIGN IN"
                    inset
                    sx={{ ml: { xl: 5, md: 2 } }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
           <ListItem disablePadding>
            <ListItemButton divider onClick={toggleDrawer("left", false)}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to="/"
              >
                <ListItemText
                  primary="HOME"
                  inset
                  sx={{ ml: { xl: 6, md: 3 } }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        {auth.isLoggedIn && !auth.isAdmin && (
          <>
            
            <ListItem disablePadding>
              <ListItemButton divider onClick={toggleDrawer("left", false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/cart"
                >
                  <ListItemText
                    primary="MY CART"
                    sx={{ ml: { xl: 5, md: 2 } }}
                    inset
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
        {!auth.isAdmin && (
          <ListItem disablePadding>
            <ListItemButton divider onClick={toggleDrawer("left", false)}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to="/about"
              >
                <ListItemText
                  primary="ABOUT US"
                  inset
                  sx={{ ml: { xl: 5, md: 2 } }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {auth.isLoggedIn && auth.isAdmin && (
          <>
            
            <ListItem disablePadding>
              <ListItemButton divider onClick={toggleDrawer("left", false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/dashboard"
                >
                  <ListItemText
                    primary="DASHBOARD"
                    inset
                    sx={{ ml: { xl: 5, md: 2 } }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              
              <ListItemButton divider onClick={toggleDrawer("left", false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/addVacation"
                >
                  <ListItemText
                    primary="ADD VACATION"
                    inset
                    sx={{ ml: { xl: 3, md: 2 } }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              
              <ListItemButton divider onClick={toggleDrawer("left", false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/users"
                >
                  <ListItemText
                    primary="USERS"
                    inset
                    sx={{ ml: { xl: 3, md: 2 } }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}

        {auth.isLoggedIn && (
          <Button
            sx={{
              color: "white",
              background: "black",
              ml: "0.5rem",
              marginTop: "2rem",
            }}
            variant="contained"
            component={Link}
            onClick={auth.logout}
            to="/"
          >
            LOG OUT
          </Button>
        )}
      </List>
    </nav>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={"left"}>
          <IconButton
            onClick={toggleDrawer("left", true)}
            aria-label="menu"
            sx={{ color: "black", fontSize: "3rem" }}
          >
            <ListSharpIcon
              className="svgIcons"
              fontSize="3rem"
              sx={{
                border: "0.25rem solid black",
                borderRadius: "50%",
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
