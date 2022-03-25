import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitIcon from "@mui/icons-material/GitHub";
import { Button, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const SocialMedia = () => {
  return (
    <>
      <Typography fontFamily="sans-serif" sx={{ color: "black" }}>
        My Linkedin profile:
      </Typography>
      <Button
        startIcon={
          <LinkedInIcon
            sx={{ color: blue[900], width: "50px", height: "50px" }}
          />
        }
        href="https://www.linkedin.com/in/matan-elgrabli/"
      ></Button>
      <Typography fontFamily="sans-serif" sx={{ color: "black" }}>
        {" "}
        My GitHub profile:{" "}
      </Typography>
      <Button
        startIcon={
          <GitIcon sx={{ color: "black", width: "45px", height: "50px" }} />
        }
        size="large"
        href="https://github.com/Matan356"
      ></Button>

      <Grid container >
        <Grid item xs={3}>
          <Typography
            component="h2"
            fontFamily="fantasy"
            textAlign={"center"}
            ml={"11rem"}
            variant="h3"
            color="black"
            width="20rem"
            sx={{ textShadow: "2px 2px grey" }}
          >
            Matan's coder
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SocialMedia;
