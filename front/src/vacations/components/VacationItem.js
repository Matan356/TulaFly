import React from "react";
import {  Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardButtons from "./CardButtons";

const VacationItem = (props) => {

  return (
    <>
      <Card
        variant="elevation"
        elevation={10}
        sx={{ m: "1rem", position: "relative", height: "14rem" }}
        key={props.id}
      >
        <CardMedia component="img" image={props.image} />
        <Box ml={1}>
          <Typography
            component="h1"
            fontSize="1.5rem"
            position="absolute"
            top="5rem"
            textAlign="left"
            color="white"
            fontFamily="'Noto Sans', sans-ser"
            sx={{
              textShadow: "2px 1px grey",
            }}
          >
            Vacation To {props.target}!
          </Typography>
          <Typography
            align="left"
            position="absolute"
            top="7.2rem"
            width="100%"
            fontFamily="'Noto Sans', sans-ser"
            sx={{
              color: "white",
              textShadow: "2px 1px grey",
            }}
          >
            {props.description}
          </Typography>
          <Typography
            position="absolute"
            top="10.5rem"
            width="100%"
            pr="1.2rem"
            align="right"
            fontSize="0.9rem"
            sx={{
              color: "white",
              fontFamily: "'Noto Sans', sans-ser",
              textShadow: "2px 1px grey",
            }}
          >
            From {props.departDate} To {props.returnDate}
          </Typography>
          <Typography
            position="absolute"
            pr="1rem"
            top="10rem"
            width="100%"
            align="left"
            fontFamily="'Noto Sans', sans-ser"
            fontSize="1.5rem"
            sx={{
              textShadow: "2px 1px grey",
            }}
          >
            {props.price}$ {props.test}
          </Typography>
        </Box>
        <CardButtons id={props.id} existUser={props.existUser} icon={props.icon} 
                buttonText={props.buttonText} inFollow={props.inFollow}
                />
      </Card>
    </>
  );
};

export default VacationItem;
