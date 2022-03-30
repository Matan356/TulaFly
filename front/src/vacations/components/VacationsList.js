import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "./VacationItem";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";

const VacationsList = () => {
  const [userVacationsId, setUserVacationsId] = useState([]);
  const [existUser, setExistUser] = useState({});
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
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

  const userVacations = loadedVacations.filter(({ _id }) =>
    userVacationsId.includes(_id)
  );
  const vacationsUnFollowing = loadedVacations.filter(
    ({ _id }) => !userVacationsId.includes(_id)
  );

  if (userVacationsId.length === 0) {
    return (
      <>
      
      {isLoading && (<div>
        <BackDrop  open ><LoadingSpiner/></BackDrop>
      </div>)}
        { 
        loadedVacations.map((vacation) => (
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
                buttonText={"follow"}
                inFollow={false}
                icon={<AddRoundedIcon />}
              />
            </Grid>
          </>
        ))}
      </>
    );
  } else {
    return (
      <>
        {userVacations.map((vacation) => (
          <>
            <Grid item xs={12} md={6} xl={6}>
              <VacationItem
                test={"in following "}
                existUser={existUser}
                key={vacation._id}
                id={vacation._id}
                description={vacation.description}
                target={vacation.target}
                departDate={vacation.departDate}
                returnDate={vacation.returnDate}
                image={vacation.image}
                price={vacation.price}
                icon={<VerifiedUserIcon />}
                buttonText={"following"}
                inFollow={true}

              />
            </Grid>
          </> 
        ))}
        {vacationsUnFollowing.map((vacation) => (
          <>
            <Grid item xs={12} md={6} xl={6}>
              <VacationItem
                existUser={existUser}
                key={vacation._id}
                id={vacation._id}
                description={vacation.description}
                target={vacation.target}
                departDate={vacation.departDate}
                returnDate={vacation.returnDate}
                image={vacation.image}
                price={vacation.price}
                icon={<AddRoundedIcon />}
                buttonText={"follow"}
                inFollow={false}

              />
            </Grid>
          </>
        ))}
      </>
    );
  }
};

export default VacationsList;
