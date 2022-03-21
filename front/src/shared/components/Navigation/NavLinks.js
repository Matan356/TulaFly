import { Button, Grid, Tab, Tabs } from "@mui/material";
import { yellow} from "@mui/material/colors";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Grid>
      <Tabs
        variant="standard"
        value={value}
        onChange={handleChange}
        textColor='primary'
        indicatorColor="primary"
      >
        <Tab
          sx={{ color: yellow[50] }}
          label="ABOUT US"
          value="/about"
          component={Link}
          to="/about"
        />
        <Tab
          sx={{ color: yellow[50] }}
          label="MY CART"
          value="/cart"
          component={Link}
          to="/cart"
        />
        <Tab
          sx={{ color: yellow[50] }}
          label="SIGN UP"
          value="/signup"
          component={Link}
          to="/signup"
        />
        <Button
        sx={{color:'black',background:'white'}}
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
