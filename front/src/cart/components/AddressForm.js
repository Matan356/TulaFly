import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { VALIDATOR_REQUIRE } from "../../shared/util/validatores";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";

const AddressForm = (props) => {
  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      address1: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onTrigger = () => {
    props.addresCallBackHandaler({
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      address1: formState.inputs.address1.value,
      city: formState.inputs.city.value,
      state: formState.inputs.state.value,
      zip: formState.inputs.zip.value,
      country: formState.inputs.country.value,
    });
    props.handleNext();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a first name."

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a last name."

          />
        </Grid>
        <Grid item xs={12}>
          <Input
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter an address."

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter an city."
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            autoComplete="shipping state"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a state."

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a zip postal code."

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a country."

          />
        </Grid>
      </Grid>
      <Grid item  >
        <Button
          variant="contained"
          type="submit"
          onClick={onTrigger}
          disabled={!formState.isValid}
          sx={{ml:{md:90,xl:90,xs:31},mt:2, xs:3, md:1}}
        >
          Next
        </Button>
      </Grid>
    </>
  );
};

export default AddressForm;
