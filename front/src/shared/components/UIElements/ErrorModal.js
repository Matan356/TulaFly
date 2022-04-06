import { Button, Card, CardActions, Typography } from "@mui/material";
import React from "react";
import BackDrop from "./BackDrop";

const ErrorModal = (props) => {
  return (
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
};

export default ErrorModal;
