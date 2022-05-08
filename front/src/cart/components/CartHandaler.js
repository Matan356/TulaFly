import React, { useContext, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Button } from "@mui/material";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import { useAuth } from "../../shared/hooks/auth-hook";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import context from "../../shared/context/context";

const CartButton = (props) => {
  const [inCart, setInCart] = useState(props.inCart);
  const { isLoading, sendRequest } =
    useHttpClient();
  const { token } = useAuth();
  const { fetchCartVacations } = useContext(context);
  const [isTouche, setIsTouche] = useState(false);

  const vacationId = props.id;
  const userId = props.userId;
  const cartHandaler = async () => {
    if (!token) {
      setIsTouche(true);
      return;
    } else {
      setIsTouche(false);
    }
    if (!inCart) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}cart/${userId}/${vacationId}`,
          "PATCH",
          {
            "Content-Type": "application/json",
          }
        );
        fetchCartVacations();
        setInCart(true);
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}cart/${userId}/${vacationId}`,
          "DELETE",
          {
            "Content-Type": "application/json",
          }
        );
        fetchCartVacations();
        setInCart(false);
      } catch (err) {}
    }
  };
  const handleError = () => {
    setIsTouche(false);
  };

  return (
    <>
      {isTouche && (
        <ErrorModal
          errorText={
            "You will not be able to add this vacation to the cart, you will need to register / log in first."
          }
          onClear={handleError}
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
        onClick={cartHandaler}
        sx={{
          position: "absolute",
          top: "12.1rem",
          width: props.width,
          fontFamily: " 'Libre Baskerville', serif",
          ml: props.ml,
          bgcolor: "#42a5f5",
          borderColor: "ActiveBorder",
          textShadow: "0.3px 0.3px black",
        }}
        color="inherit"
        endIcon={!inCart ? <AddRoundedIcon /> : <VerifiedUserIcon />}
      >
        {!inCart ? " add  to cart" : "remove"}
      </Button>
    </>
  );
};

export default CartButton;
