import React from "react";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Box } from "@mui/system";
import SkyBackground from "../../assets/blue-sky-reflection_157744-345.webp";

const VacationItem = (props) => {
  return (
    <>
      <Card
        variant="elevation"
        elevation={10}
        sx={{ m: "1rem", position: "relative", height: "14rem" }}
        key={props.id}
      >
        <CardMedia component="img" image={SkyBackground} />
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
            {props.price}$
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{
              position: "absolute",
              top: "12.1rem",
              width: "50%",
              bgcolor: "#ffe57f",
            }}
            color="inherit"
            endIcon={<AddRoundedIcon />}
          >
            Follow
          </Button>
          <Button
            sx={{
              flexWrap: "wrap",
              position: "absolute",
              top: "12.1rem",
              width: "50%",
              ml: "50%",
              bgcolor: "#42a5f5",
              borderColor: "ActiveBorder",
            }}
            color="inherit"
            endIcon={<AddRoundedIcon />}
          >
            add to cart
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default VacationItem;
