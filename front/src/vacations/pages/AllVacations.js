import { Container, Grid } from "@mui/material";
import React from "react";
import VacationsList from "../components/VacationsList";

const AllVacations = () => {
  return (
    <>
      <Container maxWidth="100%" sx={{ mt: "11rem", mb: "8rem",  }}>
        <Grid container>
          <VacationsList />
        </Grid>
      </Container>
    </>
  );
};

export default AllVacations;
