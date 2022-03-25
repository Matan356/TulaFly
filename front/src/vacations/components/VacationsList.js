import {  Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VacationItem from "./VacationItem";

const VacationsList = () => {
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

  return (
    <>
      {loadedVacations.map((vacation) => (
        <>
          <Grid item xs={12} md={6} xl={6}>
            <VacationItem
              key={vacation._id}
              id={vacation._id}
              description={vacation.description}
              target={vacation.target}
              departDate={vacation.departDate}
              returnDate={vacation.returnDate}
              image={vacation.image}
              price={vacation.price}
            />
          </Grid>
        </>
      ))}
    </>
  );
};

export default VacationsList;
