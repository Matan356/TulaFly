import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserAvatar from "../../user/components/UserAvatar";
import VacationsList from "../components/VacationsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { AuthContext } from "../../shared/context/auth-context";

const AllVacations = () => {
  const [loadedVacations, setLoadedVacations] = useState([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchAllVacations = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}main`
        );
        setLoadedVacations(responseData.vacation);
      } catch (err) {}
    };
    fetchAllVacations();
  }, [sendRequest]);

  return (
    <>
      {error && (
        <ErrorModal
          errorText={"The details you entered are incorrect, please try again."}
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
      <Container sx={{ mt: "10rem", mb: "8rem", minWidth: "100%" }}>
        <UserAvatar />
        <Grid container display="flex" justifyContent="center">
          <VacationsList
            loadedVacations={loadedVacations}
            userId={auth.userId}
          />
        </Grid>
      </Container>
    </>
  );
};

export default AllVacations;
