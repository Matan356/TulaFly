import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CartList from "../components/CartList";

const UserCart = () => {
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main`
        );
        setLoadedVacations(responseData.vacation);
      } catch (err) {}
    };
    fetchVacations();
  }, [sendRequest]);

  return (
    <>
      {error && (
        <ErrorModal
          errorText={"The details you entered are incorrect, please try again."}
          onClear={clearError}
        />
      )}
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
          <CartList loadedVacations={loadedVacations} userId={auth.userId} />
        </Grid>
      </Container>
    </>
  );
};

export default UserCart;
