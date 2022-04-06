import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <>
      <Grid container maxWidth="xl" sx={{ bgcolor: "#ffe57f", height: "100%" }}>
        <Grid item xl={12} md={12} xs={12}>
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              sx={{
                pt: 1,
                mt: "5rem",
                mb: "6rem",
                maxWidth: "45rem",
                minWidth: "20rem",
                textAlign: "center",
              }}
            >
              <Box textAlign="center" p={3}>
                <Typography
                  fontSize={35}
                  bgcolor="#fce68f"
                  border="2px solid black"
                  component="h1"
                  variant="overline"
                  mt={2}
                >
                  Welcome to TulaFly
                </Typography>
                <Typography variant="h6" component="h2" mt={2}fontFamily=" 'Comfortaa', cursive">
                  Vacation booking platform at low and affordable prices.
                </Typography>
                <Typography fontSize={20} mt={2} fontFamily="'Anek Devanagari', sans-serif">
                  A platform with the ability to track and receive requested
                  flights Offers at the lowest or most affordable prices.
                </Typography>
                <Typography fontSize={23} mt={2} fontFamily="'Josefin Sans', sans-serif">
                  On our website, you get offers on the selected flights
                  according to the calculation of the lowest or most affordable
                  flights.
                </Typography>
                <Typography
                  fontSize={18}
                  mt={2}
                  border="1px solid black"
                  bgcolor="greenyellow"
                  fontFamily=" 'Fira Sans', sans-serif"

                >
                  <b> low flight</b> - the lowest flight from the selected
                  flights.
                </Typography>
                <Typography
                  fontSize={18}
                  mt={2}
                  border="1px solid black"
                  bgcolor="darkseagreen"
                  fontFamily=" 'Fira Sans', sans-serif"
                >
                  <b>Affordable flight</b> - the lowest flight according to the
                  amount of vacation per day.
                </Typography>
                <Typography fontSize={22} mt={2} color="chocolate" fontFamily="'Jost', sans-serif">
                  Ready to go on vacation?
                </Typography>
                <Typography fontSize={23} fontFamily="'Jost', sans-serif">
                  Follow requested flights and get a very affordable offer:
                </Typography>
                <Button href="/" variant="contained" sx={{ mt: "1rem" }}>
                  GO!
                </Button>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
