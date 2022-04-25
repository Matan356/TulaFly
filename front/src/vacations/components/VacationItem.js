import React, { useContext } from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardButton from "./FollowHandaler";
import CartButton from "../../cart/components/CartHandaler";
import { AuthContext } from "../../shared/context/auth-context";
import DeleteVacation from "./DeleteVacation";
import UpdateVacation from "./UpdateVacation";

const VacationItem = (props) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Card
        variant="elevation"
        elevation={10}
        sx={{ m: "1rem", position: "relative", height: "14rem" }}
      >
        <CardMedia component="img" image={props.image} />
        <Box ml={1}>
        {auth.isAdmin && <DeleteVacation userId={props.userId} vacationId={props.id}/>}
        {auth.isAdmin && <UpdateVacation userId={props.userId} vacationId={props.id}/>}
          {props.price === props.minPay * props.days &&
            props.price !== props.calc && (
              <Typography
                right={15}
                fontSize="1.2rem"
                position="absolute"
                top="0.5rem"
                textAlign="right"
                border="2px solid white"
                bgcolor="#ffc800"
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
          {!props.hiden && !auth.isAdmin && (
            <CardButton
              id={props.id}
              existUser={props.existUser}
              icon={props.icon}
              buttonText={props.buttonText}
              inFollow={props.inFollow}
              userId={props.userId}
            />
          )}
          {!auth.isAdmin && (
            <CartButton
              userId={props.userId}
              id={props.id}
              ml={props.ml}
              width={props.width}
              existUser={props.existUser}
              icon={props.icon}
              buttonText={props.buttonText}
              inCart={props.inCart}
            />
          )}
       
        </Box>
      </Card>
    </>
  );
};

export default VacationItem;
