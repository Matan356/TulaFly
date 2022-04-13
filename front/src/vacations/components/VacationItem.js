import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardButton from "./FollowHandaler";
import CartButton from "../../cart/components/CartHandaler";

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
          {props.price === props.minPay * props.days && props.price !== props.calc && (
            <Typography
              right={15}
              fontSize="1.2rem"
              position="absolute"
              top="0.5rem"
              textAlign="right"
              border="2px solid white"
              bgcolor="darkseagreen"
              fontFamily=" 'Jost', sans-serif"
              p={0.5}
              borderRadius={2}
            >
              affordable price
            </Typography>
          )}
          {props.price === props.calc && (
            <Typography
              right={15}
              fontSize="1.2rem"
              position="absolute"
              top="0.5rem"
              textAlign="right"
              border="2px solid white"
              bgcolor="greenyellow"
              fontFamily=" 'Jost', sans-serif"
              p={0.5}
              borderRadius={2}
            >
              lowest price
            </Typography>
          )}
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
            {props.price}$
          </Typography>
        </Box>
        <Box>
          {!props.hiden && (
            <CardButton
              id={props.id}
              existUser={props.existUser}
              icon={props.icon}
              buttonText={props.buttonText}
              inFollow={props.inFollow}
            />
          )}

          <CartButton
            id={props.id}
            ml={props.ml}
            width={props.width}
            existUser={props.existUser}
            icon={props.icon}
            buttonText={props.buttonText}
            inCart={props.inCart}
          />
        </Box>
      </Card>
    </>
  );
};

export default VacationItem;
