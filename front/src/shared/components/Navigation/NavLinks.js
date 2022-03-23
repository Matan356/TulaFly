import { Button, Grid, Tab, Tabs } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Tabs variant="standard" value={value} onChange={handleChange}>
          <Tab
            sx={{ color: "black" }}
            label="ABOUT US"
            component={Link}
            to="/about"
          />
          <Tab
            sx={{ color: "black" }}
            label="MY CART"
            component={Link}
            to="/cart"
          />
          {!auth.isLoggedIn && (
            <Tab
              sx={{ color: "black" }}
              label="SIGN IN"
              component={Link}
              to="/auth"
            />
          )}

          {auth.isLoggedIn && (
            <Button
              sx={{ color: "white", background: "black" }}
              variant="contained"
              component={Link}
              onClick={auth.logout}
              to="/"
            >
              LOG OUT
            </Button>
          )}
        </Tabs>
      </Grid>
    </>
  );
};

export default NavLinks;
