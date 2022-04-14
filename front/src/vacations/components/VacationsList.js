import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "./VacationItem";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const VacationsList = (props) => {
  const [userVacationsId, setUserVacationsId] = useState([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [userCartId, setUserCartId] = useState([]);
  const [calcLowPrice, setCalcLowPrice] = useState();
  const [minPay, setMinPay] = useState();
  const [days, setDays] = useState();

  useEffect(() => {
    const fetchVacations = async () => {
      if (props.userId) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}main/${props.userId}`
          );
          setUserVacationsId(responseData.userVacations);
        } catch (err) {}
      }
    };
    fetchVacations();
  }, [sendRequest, props.userId]);

  useEffect(() => {
    const fetchVacations = async () => {
      if (props.userId) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${props.userId}`
          );
          setUserCartId(responseData.userCart);
        } catch (err) {}
      }
    };
    fetchVacations();
  }, [sendRequest, props.userId]);

  useEffect(() => {
    const userFollowingVacations = props.loadedVacations.filter(({ _id }) =>
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
  }, [props.loadedVacations, userVacationsId, calcLowPrice]);

  if (userVacationsId.length === 0) {
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
          <Grid item xs={12} md={6} xl={4} key={i}>
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
              ml={"50%"}
              width={"50%"}
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
            ) => userVacationsId.includes(_id) && userCartId.includes(_id)
          )
          .map((vacation, i) => (
            <Grid item xs={12} md={6} xl={4} key={i}>
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
                ml={"50%"}
                width={"50%"}
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
            ) => userVacationsId.includes(_id) && !userCartId.includes(_id)
          )
          .map((vacation, i) => (
            <Grid item xs={12} md={6} xl={4} key={i}>
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
                ml={"50%"}
                width={"50%"}
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
            ) => !userVacationsId.includes(_id) && userCartId.includes(_id)
          )
          .map((vacation,i) => (
              <Grid item xs={12} md={6} xl={4} key={i}>
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
                  ml={"50%"}
                  width={"50%"}
                />
              </Grid>
          ))}
        {props.loadedVacations
          .filter(
            (
              { _id } // no follow no cart
            ) => !userVacationsId.includes(_id) && !userCartId.includes(_id)
          )
          .map((vacation,i) => (
              <Grid item xs={12} md={6} xl={4} key={i}>
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
                  ml={"50%"}
                  width={"50%"}
                />
              </Grid>
          ))}
      </>
    );
  }
};

export default VacationsList;
