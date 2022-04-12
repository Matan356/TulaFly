import { Grid } from "@material-ui/core";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "../../vacations/components/VacationItem";

const CartList = () => {
  const [userVacationsId, setUserVacationsId] = useState([]);
  const [existUser, setExistUser] = useState({});
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest} = useHttpClient();
  const [calcLowPrice, setCalcLowPrice] = useState();
  const [minPay, setMinPay] = useState();
  const [days, setDays] = useState();

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

  useEffect(() => {
    const userFollowingVacations = loadedVacations.filter(({ _id }) =>
      userVacationsId.includes(_id)
    );
    setCalcLowPrice(Math.min(...userFollowingVacations.map((x) => x.price)));
    const minPay = Math.min(
      ...userFollowingVacations.map(
        (x) =>
          x.price /
          (Number(x.returnDate.split(".", 1)) -
            Number(x.departDate.split(".", 1)))
      )
    );
    setMinPay(minPay);

    const calcDays = userFollowingVacations.map(
      (x) =>
        Number(x.returnDate.split(".", 1)) - Number(x.departDate.split(".", 1))
    );
    setDays(calcDays);
  }, [loadedVacations, userVacationsId, calcLowPrice]);

  if (userVacationsId.length !== 0) {
    return (
      <>
        <Container sx={{ mt: "14rem", mb: "8rem" }}>
          <Box mb={{ xs: 6, md: 8, xl: 10 }}>
            <Typography
              fontFamily="'Cabin Sketch', cursi"
              variant="h2"
              component="h1"
              textAlign="center"
            >
              MY CART! {console.table(days)}
            </Typography>
            <Button
              sx={{
                fontFamily: "'Jost', sans-serif",
                mt: 1,
                ml: { xl: 1, xs: 9 },
                position: "absolute",
                width: { xl: 1120, md: 740 },
              }}
              position="relative"
              variant="contained"
              color="success"
              component={Link}
              to={"/pay"}
            >
              complete the purchase
            </Button>
          </Box>

          <Grid container>
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
                .map((vacation, index) => (
                  <>
                    <Grid item xs={12} md={4} xl={4}>
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
                        calc={calcLowPrice}
                        minPay={minPay}
                        days={days[index]}
                      />
                    </Grid>
                  </>
                ))}
          </Grid>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container maxWidth="xl" sx={{ textAlign: "center", mt: 25 }}>
          <Typography
            fontFamily="'Cabin Sketch', cursi"
            variant="h2"
            component="h1"
            fontSize={{ xl: 150 }}
            mb={3}
          >
            The cart is empty!
          </Typography>
          <Typography
            variant="h5"
            fontFamily="'Roboto Slab', serif"
            fontSize={{ xl: 42 }}
            mb={2}
          >
            You do not have any vacations in the cart yet.
          </Typography>
          <Typography
            variant="h5"
            fontFamily="'Roboto Slab', serif"
            fontSize={{ xl: 42 }}
            mb={2}
          >
            Go back to the home page and add vacations❕❕
          </Typography>
          <Typography
            variant="h5"
            fontFamily="'Roboto Slab', serif"
            fontSize={{ xl: 42 }}
            mb={2}
          >
            To the home page:
          </Typography>
          <Button
            to="/"
            component={Link}
            variant="contained"
            sx={{ fontSize: { xl: 24 } }}
            color="primary"
          >
            HOME
          </Button>
        </Container>
      </>
    );
  }
};
export default CartList;
