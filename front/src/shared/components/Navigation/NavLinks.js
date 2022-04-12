import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Grid container spacing={4}   display={{ xs: "none",md:"none",xl:"flex" }} flexDirection="row"  >
        <Grid item >
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              fontFamily: "'Roboto Slab', serif",
              border: "2px solid #ffe57f",
              color: "black",
             
              
            }}
            component={Link}
            to="/about"
          >
            ABOUT US
          </Button>
        </Grid>
        {!auth.isLoggedIn && (
          <>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{
                 
                  fontFamily: "'Roboto Slab', serif",
                  border: "2px solid #ffe57f",
                  color: "black",
                }}
                component={Link}
                to="/auth"
              >
                SIGN IN
              </Button>
            </Grid>
          </>
        )}

        {auth.isLoggedIn && (
          <>
            <Grid item >
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  border: "2px solid #ffe57f",
                  color: "black",
                 
                }}
                component={Link}
                to="/cart"
              >
                MY CART
              </Button>
            </Grid>
            <Grid item >
              <Button
                sx={{
                  color: "white",
                  background: "black",
                  height: "2.35rem",
                }}
                variant="contained"
                component={Link}
                onClick={auth.logout}
                to="/"
              >
                LOG OUT
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default NavLinks;
