import { Grid } from "@mui/material";
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
    userCartId,
    fetchVacations,
    fetching,
    fetchCartVacations,
  } = useContext(context);

  useEffect(() => {
    if (!fetching) {
      return;
    }
    fetchVacations();
  }, [fetching, fetchVacations]);

  useEffect(() => {
    if (!fetching) {
      return;
    }
    fetchCartVacations();
  }, [fetching, fetchCartVacations]);
  
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
        {props.loadedVacations.map((vacation, i) => (
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
        {props.loadedVacations
          .filter(
            (
              { _id } // yes follow yes cart
            ) => userVacations.includes(_id) && userCartId.includes(_id)
          )
          .map((vacation, i) => (
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
                days={days[i]}
              />
            </Grid>
          ))}
        {props.loadedVacations
          .filter(
            (
              { _id } // yes follow no cart
            ) => userVacations.includes(_id) && !userCartId.includes(_id)
          )
          .map((vacation, i) => (
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
                days={days[i]}
              />
            </Grid>
          ))}
        {props.loadedVacations
          .filter(
            (
              { _id } // no follow yes cart
            ) => !userVacations.includes(_id) && userCartId.includes(_id)
          )
          .map((vacation, i) => (
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
        {props.loadedVacations
          .filter(
            (
              { _id } // no follow no cart
            ) => !userVacations.includes(_id) && !userCartId.includes(_id)
          )
          .map((vacation, i) => (
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
