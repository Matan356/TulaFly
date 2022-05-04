import { Grid } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import context from "../../shared/context/context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "../../vacations/components/VacationItem";

const CartList = (props) => {
  const { isLoading } = useHttpClient();
  const [calcLowPrice, setCalcLowPrice] = useState();
  const [minPay, setMinPay] = useState();
  const [days, setDays] = useState();
  const  {fetchCartVacations,cartVacations} = useContext(context)

  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!fetching) return
      fetchCartVacations();
    
    return ()=>{
      setFetching(false)
    }
  }, [fetching, fetchCartVacations]);

  useEffect(() => {
    const userFollowingVacations = props.loadedVacations.filter(({ _id }) =>
      cartVacations.includes(_id)
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
  }, [props.loadedVacations, cartVacations, calcLowPrice]);

  if (cartVacations.length !== 0) {
    return (
      <>


        <Grid item xl={12} md={12} xs={12}>
          <Button
            color="success"
            variant="contained"
            sx={{
              minWidth: { xl: 1455, md: "97%", xs: 335 },
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

        {!isLoading &&
          props.loadedVacations &&
          props.loadedVacations
            .filter(({ _id }) => cartVacations.includes(_id))
            .map((vacation, i) => (
              <Grid item xs={12} md={6} xl={6} key={vacation._id}>
                <VacationItem
                  id={vacation._id}
                  userId={props.userId}
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
            variant="contained"
            sx={{ fontSize: { xl: 20, md: 18, xs: 15 } }}
            color="primary"
            component={Link}
            to="/"
          >
            HOME
          </Button>
        </Container>
      </>
    );
  }
};
export default CartList;
