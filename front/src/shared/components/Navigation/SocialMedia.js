import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitIcon from "@mui/icons-material/GitHub";
import { Button, Typography } from "@mui/material";
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
            size="large"
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
          <GitIcon
            sx={{ color: "black", width: "45px", height: "50px" }}
            size="large"
          />
        }
        size="large"
        href="https://github.com/Matan356"
      ></Button>
      <Typography
        component="h1"
        fontFamily="fantasy"
        ml={"10%"}
        variant="h3"
        color="black"
      >
        Matan's coder
      </Typography>
    </>
  );
};

export default SocialMedia;
