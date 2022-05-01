import { Container, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import CartList from "../components/CartList";

const UserCart = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "10rem", mb: "8rem" }}>
        <Typography
          fontFamily="'Cabin Sketch', cursi"
          variant="h2"
          component="h1"
          mb={3}
          textAlign="center"
        >
          MY CART!
        </Typography>
        <Grid container>
          <CartList userId={auth.userId} />
        </Grid>
      </Container>
    </>
  );
};

export default UserCart;
