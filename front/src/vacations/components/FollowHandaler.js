import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Button } from "@mui/material";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import { useAuth } from "../../shared/hooks/auth-hook";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const CardButton = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { token } = useAuth();
  const [inFollow, setInFollow] = useState(props.inFollow);

  const followHandaler = async () => {
    const vacationId = props.id;
    const userId = props.userId;
    if (!inFollow) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}vacations/${userId}/${vacationId}`,
          "PATCH",
          {
            "Content-Type": "application/json",
          }
        );
        setInFollow(true);
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
        setInFollow(false);
      } catch (err) {}
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          errorText={
            "You will not be able to follow this vacation, you will need to register / log in first."
          }
          onClear={clearError}
        />
      )}

      {isLoading && token && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
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
        endIcon={!inFollow ? <AddRoundedIcon /> : <VerifiedUserIcon />}
      >
        {!inFollow ? "Follow" : "Following"}
      </Button>
    </>
  );
};

export default CardButton;
