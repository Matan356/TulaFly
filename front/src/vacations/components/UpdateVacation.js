import { Button, Grid, Paper, Typography } from "@mui/material";
import React, {  useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validatores";
import { socket } from '../../shared/context/socket'; 


const UpdateVacation = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [formMode, setFormMode] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      departDate: {
        value: "",
        isValid: false,
      },
      returnDate: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formModeHandaler = () => {
    setFormMode(true);
  };

  const VacationUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    if (formState.isValid) {
      setFormMode(false);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}panelAdmin/${props.userId}/${props.vacationId}`,
          "PATCH",
          JSON.stringify({
            description: formState.inputs.description.value,
            departDate: formState.inputs.departDate.value,
            returnDate: formState.inputs.returnDate.value,
            price: formState.inputs.price.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        socket.emit("update",true)
      } catch (err) {}
    } else {
      setFormMode(false);
    }
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div>
          <BackDrop open>
            <LoadingSpiner />
          </BackDrop>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ position: "absolute", top: 0, right: 0 }}
        endIcon={<SystemUpdateAltIcon sx={{mr:1}} />}
        onClick={formModeHandaler}
        
      >
        
      </Button>
      {!isLoading && formMode && (
        <BackDrop open>
          <Paper variant="outlined" sx={{ mt: 25, mb: 12 }}>
            <Typography component="h1" variant="h4" align="center" p={3}>
              Update Vacation
            </Typography>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  autoComplete="given-description"
                  variant="standard"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  onInput={inputHandler}
                  errorText="Please enter a Description."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  id="price"
                  name="price"
                  label="price"
                  fullWidth
                  autoComplete="Add Price"
                  variant="standard"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  errorText="Please enter an price."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  id="departDate"
                  name="departDate"
                  label="Depart Date"
                  fullWidth
                  autoComplete="Depart-Date"
                  variant="standard"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  errorText="Please enter a Depart Date."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  id="returnDate"
                  name="returnDate"
                  label="Return Date"
                  fullWidth
                  autoComplete="Return Date"
                  variant="standard"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  errorText="Please enter a Return Date."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={VacationUpdateSubmitHandler}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  UPDATE
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </BackDrop>
      )}
    </React.Fragment>
  );
};

export default UpdateVacation;
