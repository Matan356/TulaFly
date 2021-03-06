import { Button } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHttpClient } from "../../shared/hooks/http-hook";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { socket } from '../../shared/context/socket'; 

const DeleteVacation = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
  const deleteHandaler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}panelAdmin/${props.userId}/${props.vacationId}`,
        "DELETE",
        {
          "Content-Type": "application/json",
        }
      );
      socket.emit("delete",true)
    } catch (err) {}
  };

  return (
    <>
      {isLoading && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Button
        variant="contained"
        color="error"
        sx={{ position: "absolute", top: 0, left: 0 }}
        endIcon={<DeleteForeverIcon sx={{mr:1}} />}
        onClick={deleteHandaler}
      >
        
      </Button>
    </>
  );
};

export default DeleteVacation;
