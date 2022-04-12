import { Container, Grid } from "@mui/material";
import React from "react";
import CartList from "../components/CartList";


const UserCart = () => {
  return (
    <>
        <Container maxWidth="xl" sx={{ mt: "9rem", mb: "8rem" }}>
          <Grid container>
            <CartList />
          </Grid>
        </Container>
    </>
  );
};

export default UserCart;
