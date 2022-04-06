import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          fontFamily: "'Roboto Slab', serif",
          border: "2px solid #ffe57f",
          mt: "0.1rem",
          color: "black",
        }}
        component={Link}
        to="/about"
      >
        ABOUT US
      </Button>
      
      {!auth.isLoggedIn && (
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            mr: "0.5rem",
            ml: "0.5rem",
            fontFamily: "'Roboto Slab', serif",
            border: "2px solid #ffe57f",
            mt: "0.1rem",
            color: "black",
          }}
          component={Link}
          to="/auth"
        >
          SIGN IN
        </Button>
      )}

      {auth.isLoggedIn && (<>
        <Button
        variant="outlined"
        color="inherit"
        sx={{
          mr: "0.5rem",
          ml: "0.5rem",
          fontFamily: "'Roboto Slab', serif",
          border: "2px solid #ffe57f",
          mt: "0.1rem",
          color: "black",
        }}
        component={Link}
        to="/cart"
      >
        MY CART
      </Button>
        <Button
          sx={{
            color: "white",
            background: "black",
            height: "2.35rem",
            mt: "0.1rem",
          }}
          variant="contained"
          component={Link}
          onClick={auth.logout}
          to="/"
        >
          LOG OUT
        </Button></>
      )}
    </>
  );
};

export default NavLinks;
