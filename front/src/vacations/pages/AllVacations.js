import { Container, Grid } from "@mui/material";
import React from "react";
import VacationsList from "../components/VacationsList";

const AllVacations = (props) => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "8rem", mb: "8rem" }}>
        <Grid container>
          <VacationsList />
        </Grid>
      </Container>
    </>
  );
};

export default AllVacations;
