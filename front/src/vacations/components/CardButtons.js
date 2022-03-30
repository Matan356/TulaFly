import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Box, Button } from "@mui/material";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import { useAuth } from "../../shared/hooks/auth-hook";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";

const CardButtons = (props) => {
  const [inCart, setInCart] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const { token } = useAuth();

  const followHandaler = async () => {
    const vacationId = props.id;
    const userId = props.existUser.userId;
    if (!props.inFollow) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}vacations/${userId}/${vacationId}`,
          "PATCH",
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}vacations/${userId}/${vacationId}`,
          "DELETE",
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
    }
  };

  const cartHandaler = () => {};

  return (
    <>
      {isLoading && token && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Box>
        <Button
          onClick={followHandaler}
          sx={{
            position: "absolute",
            top: "12.1rem",
            width: "50%",
            bgcolor: "#ffe57f",
            textShadow: "0.3px 0.3px black",
          }}
          color="inherit"
          endIcon={props.icon}
        >
          {props.buttonText}
        </Button>
        <Button
          onClick={cartHandaler}
          sx={{
            position: "absolute",
            top: "12.1rem",
            width: "50%",
            ml: "50%",
            bgcolor: "#42a5f5",
            borderColor: "ActiveBorder",
            textShadow: "0.3px 0.3px black",
          }}
          color="inherit"
          endIcon={!inCart ? <AddRoundedIcon /> : <VerifiedUserIcon />}
        >
          {!inCart ? " add  to cart" : "in cart"}
        </Button>
      </Box>
    </>
  );
};

export default CardButtons;
