import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitIcon from "@mui/icons-material/GitHub";
import { Button, Grid, Typography, makeStyles } from "@mui/material";
import { blue } from "@mui/material/colors";

const SocialMedia = () => {
  return (
    <>
      <Typography fontFamily="sans-serif" sx={{ color: "black" }}>
        My Linkedin profile:
      </Typography>
      <Button
        startIcon={
          <LinkedInIcon className="svgIcons" sx={{ color: blue[900] }} />
        }
        href="https://www.linkedin.com/in/matan-elgrabli/"
      ></Button>
      <Typography fontFamily="sans-serif" sx={{ color: "black" }}>
        My GitHub profile:{" "}
      </Typography>
      <Button
        startIcon={<GitIcon className="svgIcons" sx={{ color: "black" }} />}
        size="large"
        href="https://github.com/Matan356"
      ></Button>

      <Grid container>
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
            Matan's coding
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SocialMedia;
