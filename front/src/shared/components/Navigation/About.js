import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Grid
        container
        sx={{ bgcolor: "#ffe57f", height: { xl: 980 }, width: "100%" }}
      >
        <Grid item xl={12} md={12} xs={12}>
          <Container maxWidth="xl">
            <Paper
              elevation={3}
              sx={{
                pt: 1,
                mt: { md: 15, xs: 15, xl: 10 },
                mb: "6rem",
                ml: { xl: 30, md: 7 },
                width: { md: 800, xl: 1000 },
                textAlign: "center",
              }}
            >
              <Box textAlign="center" p={3}>
                <Typography
                  fontSize={35}
                  bgcolor="#fce68f"
                  border="2px solid black"
                  borderRadius={3}
                  component="h1"
                  variant="overline"
                  mt={2}
                >
                  Welcome to TulaFly! 😃
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  mt={2}
                  fontFamily=" 'Comfortaa', cursive"
                >
                  A holiday booking platform at low and affordable prices for
                  all world destinations.
                </Typography>
                <Typography
                  fontSize={20}
                  mt={2}
                  fontFamily="'Anek Devanagari', sans-serif"
                >
                  A platform with the ability to track and receive offers on
                  requested vacations at the lowest or most affordable prices.
                </Typography>
                <Typography
                  fontSize={23}
                  mt={2}
                  fontFamily="'Jost', sans-serif"
                >
                  On our website, you will receive offers on the vacations you
                  have chosen and followed according to the calculation of the
                  lowest or most affordable holidays. You will be able to decide
                  on the relevant vacation for you.
                </Typography>
                <Typography
                  fontSize={18}
                  mt={2}
                  border="1px solid black"
                  bgcolor="greenyellow"
                  fontFamily=" 'Fira Sans', sans-serif"
                >
                  Cheap price - the lowest vacation from the selected flights.
                </Typography>
                <Typography
                  fontSize={18}
                  mt={2}
                  border="1px solid black"
                  bgcolor="darkseagreen"
                  fontFamily=" 'Fira Sans', sans-serif"
                >
                  Affordable price - the lowest vacation according to the
                  vacation cost per day.
                </Typography>
                <Typography
                  fontSize={22}
                  mt={2}
                  color="chocolate"
                  fontFamily="'Jost', sans-serif"
                >
                  Ready to go on vacation?
                </Typography>
                <Typography
                  fontSize={23}
                  fontFamily="'Jost', sans-serif"
                  gutterBottom
                >
                  Follow the requested vacations and get an exceptionally
                  affordable offer:
                </Typography>
                <Button
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    position: "relative",
                  }}
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/"}
                >
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
