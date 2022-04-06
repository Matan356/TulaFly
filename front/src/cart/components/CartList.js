import { Grid } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "../../vacations/components/VacationItem";

const CartList = () => {
  const [userVacationsId, setUserVacationsId] = useState([]);
  const [existUser, setExistUser] = useState({});
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setExistUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchVacations = async () => {
      if (existUser.userId) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${existUser.userId}`
          );
          setUserVacationsId(responseData.userCart);
        } catch (err) {}
      }
    };
    fetchVacations();
  }, [sendRequest, existUser]);


  if (userVacationsId.length !== 0) {
    return (
      <>
        <Typography
          fontFamily="'Cabin Sketch', cursi"
          variant="h2"
          component="h1"
          mb={3}
          textAlign="center"
          ml="40%"
        >
          MT CART!
        </Typography>
        {isLoading && (
          <div>
            <BackDrop open>
              <LoadingSpiner />
            </BackDrop>
          </div>
        )}
        {!isLoading &&
          loadedVacations &&
          loadedVacations
            .filter(({ _id }) => userVacationsId.includes(_id))
            .map((vacation) => (
              <>
                <Grid item xs={12} md={6} xl={6}>
                  <VacationItem
                    key={vacation._id}
                    id={vacation._id}
                    existUser={existUser}
                    description={vacation.description}
                    target={vacation.target}
                    departDate={vacation.departDate}
                    returnDate={vacation.returnDate}
                    image={vacation.image}
                    price={vacation.price}
                    inCart={true}
                    ml={null}
                    width={"100%"}
                    hiden={true}
                  />
                </Grid>
              </>
            ))}
      </>
    );
  } else {
    return (
      <>
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: "3rem" }}>
          <Typography
            fontFamily="'Cabin Sketch', cursi"
            variant="h2"
            component="h1"
            mb={3}
          >
            The cart is empty!
          </Typography>
          <Typography variant="h5" fontFamily="'Roboto Slab', serif" mb={2}>
            You do not have any vacations in the cart yet.
          </Typography>
          <Typography variant="h5" fontFamily="'Roboto Slab', serif" mb={2}>
            Go back to the home page and add vacations❕❕
          </Typography>
          <Typography variant="h5" fontFamily="'Roboto Slab', serif" mb={2}>
            To the home page:{" "}
          </Typography>
          <Button href="/" variant="contained" color="primary">
            HOME
          </Button>
        </Container>
      </>
    );
  }
};
export default CartList;
