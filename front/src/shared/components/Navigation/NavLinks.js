import { Button, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const [value, setValue] = useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Grid container>
      <Tabs
        variant="standard"
        value={value}
        onChange={handleChange}
        // textColor='primary'
        // indicatorColor="primary"
      >
        <Tab
          sx={{ color: "black" }}
          label="ABOUT US"
          value="/about"
          component={Link}
          to="/about"
        />
        <Tab
          sx={{ color: "black" }}
          label="MY CART"
          value="/cart"
          component={Link}
          to="/cart"
        />
        <Tab
          sx={{ color: "black" }}
          label="SIGN UP"
          value="/auth"
          component={Link}
          to="/auth"
        />
        <Button
        sx={{color:'white',background:'black'}}
        variant="contained"
          component={Link}
          to="/"
        >LOG OUT</Button>
      </Tabs>
      </Grid>
    </>
  );
};

export default NavLinks;
