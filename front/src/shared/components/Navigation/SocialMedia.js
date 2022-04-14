import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitIcon from "@mui/icons-material/GitHub";
import { Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const SocialMedia = () => {
  return (
    <>
      <Typography
        fontSize={{ xl: 25, md: 18 }}
        fontFamily="'Rubik Wet Paint', cursive"
        sx={{ color: "black" }}
      >
        Linkedin:
      </Typography>
      <Button
        startIcon={
          <LinkedInIcon className="svgIcons" sx={{ color: blue[900] }} />
        }
        href="https://www.linkedin.com/in/matan-elgrabli/"
      ></Button>
      <Typography
        fontSize={{ xl: 25, md: 18 }}
        fontFamily="'Rubik Wet Paint', cursive"
        sx={{ color: "black" }}
      >
        GitHub:
      </Typography>
      <Button
        startIcon={<GitIcon className="svgIcons" sx={{ color: "black" }} />}
        size="large"
        href="https://github.com/Matan356"
      ></Button>

      <Typography
        component="h2"
        fontFamily="fantasy"
        align="center"
        mr={{ xs: 1, md: 32, xl: 41 }}
        fontSize={{ xs: 29, md: 45, xl: 56 }}
        variant="h3"
        color="black"
        width="100%"
        sx={{ textShadow: "2px 2px grey" }}
      >
        Matan's coding
      </Typography>
    </>
  );
};

export default SocialMedia;
