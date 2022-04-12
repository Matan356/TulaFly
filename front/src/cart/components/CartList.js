import { Grid } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
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
  const { isLoading, sendRequest } = useHttpClient();
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
        <Typography
          fontFamily="'Cabin Sketch', cursi"
          variant="h2"
          component="h1"
          mb={3}
          textAlign="center"
          ml={{ xl: 77, md: 43, xs: 9 }}
        >
          MT CART!
        </Typography>
        <Grid item xl={12} md={12} xs={12}>
          <Button
            color="success"
            variant="contained"
            sx={{
              width: { xl: 1455, md: 857, xs: 335 },
              ml: 2,
              textAlign: "center",
              fontFamily: "'Jost', sans-serif",
              fontSize: 17,
            }}
            component={Link}
            to="/pay"
          >
            Complete the purchase
          </Button>
        </Grid>
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
            .map((vacation, i) => (
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
                    calc={calcLowPrice}
                    minPay={minPay}
                    days={days[i]}
                  />
                </Grid>
              </>
            ))}
      </>
    );
  } else {
    return (
      <>
        <Container maxWidth="xl" sx={{ textAlign: "center", mt: "3rem" }}>
          <Typography
            fontFamily="'Cabin Sketch', cursi"
            variant="h2"
            component="h1"
            fontSize={{ xl: 100, md: 90 }}
            mb={3}
          >
            The cart is empty!
          </Typography>
          <Typography
            variant="h5"
            fontSize={{ xl: 30, md: 27 }}
            fontFamily="'Roboto Slab', serif"
            mb={2}
          >
            You do not have any vacations in the cart yet.
          </Typography>
          <Typography
            variant="h5"
            fontSize={{ xl: 30, md: 27 }}
            fontFamily="'Roboto Slab', serif"
            mb={2}
          >
            Go back to the home page and add vacations❕❕
          </Typography>
          <Typography
            variant="h5"
            fontSize={{ xl: 30, md: 27 }}
            fontFamily="'Roboto Slab', serif"
            mb={2}
          >
            To the home page:{" "}
          </Typography>
          <Button
            href="/"
            variant="contained"
            sx={{ fontSize: { xl: 20, md: 18, xs: 15 } }}
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
