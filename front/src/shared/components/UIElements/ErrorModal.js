import { Button, Card, CardActions, Typography } from "@mui/material";
import React from "react";
import BackDrop from "./BackDrop";
import ReactDOM from 'react-dom';


const ErrorModal = (props) => {
  const content = (
    <>
      <BackDrop open={true} onCancel={props.onClear}>
        <Card
          sx={{ width: "85%", maxWidth: "30rem" }}
          align="center"
          variant="outlined"
        >
          <Typography
            bgcolor="orange"
            fontSize="1.7rem"
            color="white"
            gutterBottom
          >
            An Error Occurred!
          </Typography>
          <Typography variant="h5" component="h2" mt={3}>
            {props.errorText}
          </Typography>
          <CardActions>
            <Button onClick={props.onClear} size="small" variant="outlined">
              OK
            </Button>
          </CardActions>
        </Card>
      </BackDrop>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));

};

export default ErrorModal;
