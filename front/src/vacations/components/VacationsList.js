import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "./VacationItem";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import context from "../../shared/context/context";

const VacationsList = (props) => {
  const { isLoading, error, clearError } = useHttpClient();
  const [calcLowPrice, setCalcLowPrice] = useState();
  const [minPay, setMinPay] = useState();
  const [days, setDays] = useState();
  const {
    userVacations,
    cartVacations,
    fetchUserVacations,
    fetchCartVacations,
  } = useContext(context);
  const [fetchingCart, setFetchingCart] = useState(true);
  const [fetchingFollow, setFetchingFollow] = useState(true);

  useEffect(() => {
    if (!fetchingFollow) return;
    fetchUserVacations();
    return () => {
      setFetchingFollow(false);
    };
  }, [fetchingFollow, fetchUserVacations]);

  useEffect(() => {
    if (!fetchingCart) return;
    fetchCartVacations();
    return () => {
      setFetchingCart(false);
    };
  }, [fetchingCart, fetchCartVacations]);

  useEffect(() => {
    if (userVacations) {
      const userFollowingVacations = props.loadedVacations.filter(({ _id }) =>
        userVacations.includes(_id)
      );

      setCalcLowPrice(Math.min(...userFollowingVacations.map((x) => x.price)));

      const minPayment = Math.min(
        ...userFollowingVacations.map(
          (x) =>
            x.price /
            (Number(x.returnDate.split("/", 1)) -
              Number(x.departDate.split("/", 1)))
        )
      );

      setMinPay(minPayment);
      const calcDays = userFollowingVacations.map(
        (x) =>
          Number(x.returnDate.split("/", 1)) -
          Number(x.departDate.split("/", 1))
      );
      setDays(calcDays);
    }
  }, [props.loadedVacations, userVacations, calcLowPrice]);

  const inCart_inFollow_arr = props.loadedVacations.filter(
    (
      { _id } // yes follow yes cart
    ) => userVacations.includes(_id) && cartVacations.includes(_id)
  );

  const inFollow_arr = props.loadedVacations.filter(
    (
      { _id } // yes follow no cart
    ) => userVacations.includes(_id) && !cartVacations.includes(_id)
  );

  const inCart_arr = props.loadedVacations.filter(
    (
      { _id } // no follow yes cart
    ) => !userVacations.includes(_id) && cartVacations.includes(_id)
  );
  const new_arr = props.loadedVacations.filter(
    (
      { _id } // no follow no cart
    ) => !userVacations.includes(_id) && !cartVacations.includes(_id)
  );

  if (userVacations?.length === 0 && props.loadedVacations) {
    return (
      <>
        {error && (
          <ErrorModal
            errorText={
              "The details you entered are incorrect, please try again."
            }
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
        <Grid item xs={12} md={12} xl={12}>
          <Typography
            fontFamily="'Questrial', sans-serif"
            color="#464d29"
            variant="h1"
            fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
            textAlign="center"
            mt={3}
          >
            All vacations
          </Typography>
        </Grid>
        {props.loadedVacations.map((vacation) => (
          <Grid item xs={12} md={6} xl={4} key={vacation._id}>
            <VacationItem
              id={vacation._id}
              userId={props.userId}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
              inFollow={false}
              ml={{ xs: "52%", xl: "70%" }}
              width={{ xs: "48%", xl: "30%" }}
            />
          </Grid>
        ))}
      </>
    );
  } else {
    return (
      <>
        {inCart_inFollow_arr.length > 0 && (
          <Grid item xs={12} md={12} xl={12}>
            <Typography
              fontFamily="'Questrial', sans-serif"
              color="#464d29"
              variant="h1"
              fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
              textAlign="center"
              mt={3}
            >
              Vacations that I follow and in the cart
            </Typography>
          </Grid>
        )}
        {inCart_inFollow_arr.map((vacation, i) => (
          <Grid item xs={12} md={6} xl={4} key={vacation._id}>
            <VacationItem
              userId={props.userId}
              id={vacation._id}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
              inFollow={true}
              inCart={true}
              ml={{ xs: "52%", xl: "70%" }}
              width={{ xs: "48%", xl: "30%" }}
              calc={calcLowPrice}
              minPay={minPay}
              days={days && days[i]}
            />
          </Grid>
        ))}
        {inFollow_arr.length > 0 && (
          <Grid item xs={12} md={12} xl={12}>
            <Typography
              fontFamily="'Questrial', sans-serif"
              color="#464d29"
              variant="h1"
              fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
              textAlign="center"
              mt={3}
            >
              Vacations that I follow
            </Typography>
          </Grid>
        )}
        {inFollow_arr.map((vacation, i) => (
          <Grid item xs={12} md={6} xl={4} key={vacation._id}>
            <VacationItem
              userId={props.userId}
              id={vacation._id}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
              inFollow={true}
              inCart={false}
              ml={{ xs: "52%", xl: "70%" }}
              width={{ xs: "48%", xl: "30%" }}
              calc={calcLowPrice}
              minPay={minPay}
              days={days && days[i]}
            />
          </Grid>
        ))}
        {inCart_arr.length > 0 && (
          <Grid item xs={12} md={12} xl={12}>
            <Typography
              fontFamily="'Questrial', sans-serif"
              color="#464d29"
              variant="h1"
              fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
              textAlign="center"
              mt={3}
            >
              Vacations in the cart
            </Typography>
          </Grid>
        )}
        {inCart_arr.map((vacation) => (
          <Grid item xs={12} md={6} xl={4} key={vacation._id}>
            <VacationItem
              userId={props.userId}
              id={vacation._id}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
              inFollow={false}
              inCart={true}
              ml={{ xs: "52%", xl: "70%" }}
              width={{ xs: "48%", xl: "30%" }}
            />
          </Grid>
        ))}
        {new_arr.length > 0 && (
          <Grid item xs={12} md={12} xl={12}>
            <Typography
              fontFamily="'Questrial', sans-serif"
              color="#464d29"
              variant="h1"
              fontSize={{ xs: 30, xl: 45, md: 40, xxl: 50 }}
              textAlign="center"
              mt={3}
            >
              New vacations
            </Typography>
          </Grid>
        )}
        {new_arr.map((vacation) => (
          <Grid item xs={12} md={6} xl={4} key={vacation._id}>
            <VacationItem
              userId={props.userId}
              id={vacation._id}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
              inFollow={false}
              inCart={false}
              ml={{ xs: "52%", xl: "70%" }}
              width={{ xs: "48%", xl: "30%" }}
            />
          </Grid>
        ))}
      </>
    );
  }
};

export default VacationsList;
