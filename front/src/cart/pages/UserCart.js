import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { AuthContext } from "../../shared/context/auth-context";
import context from "../../shared/context/context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CartList from "../components/CartList";

const UserCart = () => {
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchAllVacations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main`
        );
        setLoadedVacations(responseData.vacation);
      } catch (err) {}
    };
    fetchAllVacations();
  }, [sendRequest]);


  return (
    <>
            {isLoading && (
          <div>
            <BackDrop open>
              <LoadingSpiner />
            </BackDrop>
          </div>
        )}
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
          <CartList userId={auth.userId} loadedVacations={loadedVacations}/>
        </Grid>
      </Container>
    </>
  );
};

export default UserCart;
