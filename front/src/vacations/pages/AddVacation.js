import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpiner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validatores";

const AddVacation = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext)
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      target: {
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const vacationSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}panelAdmin/${auth.userId}`,
        "POST",
        JSON.stringify({
          description: formState.inputs.description.value,
          target: formState.inputs.target.value,
          departDate: formState.inputs.departDate.value,
          returnDate: formState.inputs.returnDate.value,
          price: formState.inputs.price.value,
          image: formState.inputs.image.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
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
      <Container maxWidth="xl">
      <Paper
        variant="outlined"
        sx={{mt:25,mb:12}}
      >
          <Typography component="h1" variant="h4" align="center" p={3} >
            Add Vacation
          </Typography>
        <Grid container spacing={3}p={3}>
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
              errorText="Please enter a Description min 5 Words."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              required
              id="target"
              name="target"
              label="Target"
              fullWidth
              autoComplete="given-target"
              variant="standard"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please enter a target."
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
              errorText="Please enter an Return Date."
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
    <ImageUpload   id="image"
          onInput={inputHandler}
          errorText="Please provide an image."/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={vacationSubmitHandler}
              type="submit"
              disabled={!formState.isValid}
              variant="contained"
              size="large"
            >
              ADD VACATION
            </Button>
          </Grid>
        </Grid>
      </Paper>
      </Container>
    </>
  );
};

export default AddVacation;
