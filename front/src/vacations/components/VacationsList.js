import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "./VacationItem";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";

const VacationsList = () => {
  const [userVacationsId, setUserVacationsId] = useState([]);
  const [existUser, setExistUser] = useState({});
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const [userCartId, setUserCartId] = useState([]);
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
            `${process.env.REACT_APP_BACKEND_URL}main/${existUser.userId}`
          );
          setUserVacationsId(responseData.userVacations);
        } catch (err) {}
      }
    };
    fetchVacations();
  }, [sendRequest, existUser]);

  useEffect(() => {
    const fetchVacations = async () => {
      if (existUser.userId) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}cart/${existUser.userId}`
          );
          setUserCartId(responseData.userCart);
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
          Number(x.returnDate.split(".", 1)) -
          Number(x.departDate.split(".", 1))
      )
    setDays(calcDays);
  }, [loadedVacations, userVacationsId, calcLowPrice, days]);

  if (userVacationsId.length === 0) {
    return (
      <>
        {isLoading && (
          <div>
            <BackDrop open>
              <LoadingSpiner />
            </BackDrop>
          </div>
        )}
        {!isLoading &&
          loadedVacations &&
          loadedVacations.map((vacation) => (
            <>
              <Grid item xs={12} md={6} xl={4}>
                <VacationItem
                  id={vacation._id}
                  existUser={existUser}
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
            </>
          ))}
      </>
    );
  } else {
    return (
      <>
        {!isLoading &&
          loadedVacations &&
          loadedVacations
            .filter(
              (
                { _id } // yes follow yes cart
              ) => userVacationsId.includes(_id) && userCartId.includes(_id)
            )
            .map((vacation,index) => (
              <>
                <Grid item xs={12} md={6} xl={4}>
                  <VacationItem
                    key={vacation._id}
                    existUser={existUser}
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
                  days={days[index]}
                  />
                </Grid>
              </>
            ))}
        {!isLoading &&
          loadedVacations &&
          loadedVacations
            .filter(
              (
                { _id } // yes follow no cart
              ) => userVacationsId.includes(_id) && !userCartId.includes(_id)
            )
            .map((vacation) => (
              <>
                <Grid item xs={12} md={6} xl={4}>
                  <VacationItem
                    key={vacation._id}
                    existUser={existUser}
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
                    days={days}
                  />
                </Grid>
              </>
            ))}
        {!isLoading &&
          loadedVacations &&
          loadedVacations
            .filter(
              (
                { _id } // no follow yes cart
              ) => !userVacationsId.includes(_id) && userCartId.includes(_id)
            )
            .map((vacation) => (
              <>
                <Grid item xs={12} md={6} xl={4}>
                  <VacationItem
                    key={vacation._id}
                    existUser={existUser}
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
              </>
            ))}
        {!isLoading &&
          loadedVacations &&
          loadedVacations
            .filter(
              (
                { _id } // no follow no cart
              ) => !userVacationsId.includes(_id) && !userCartId.includes(_id)
            )
            .map((vacation) => (
              <>
                <Grid item xs={12} md={6} xl={4}>
                  <VacationItem
                    key={vacation._id}
                    existUser={existUser}
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
              </>
            ))}
      </>
    );
  }
};

export default VacationsList;
