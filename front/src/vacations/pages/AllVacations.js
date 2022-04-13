import { Container, Grid } from "@mui/material";
import React from "react";
import UserAvatar from "../../user/pages/UserAvatar";
import VacationsList from "../components/VacationsList";

const AllVacations = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "10rem", mb: "8rem" }}>
        <UserAvatar/>
        <Grid container display="flex" justifyContent="center" >
          <VacationsList />
        </Grid>
      </Container>
    </>
  );
};

export default AllVacations;
