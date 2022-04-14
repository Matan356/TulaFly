import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH,VALIDATOR_MAXLENGTH, VALIDATOR_DATE} from "../../shared/util/validatores";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";

const PaymentForm = (props) => {
  const [formState, inputHandler] = useForm(
    {
      cardName: {
        value: "",
        isValid: false,
      },
      cardNumber: {
        value: "",
        isValid: false,
      },
      expDate: {
        value: "",
        isValid: false,
      },
      cvv: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onTrigger = () => {
    props.paymentCallBackHandaler({
      cardName: formState.inputs.cardName.value,
      cardNumber: formState.inputs.cardNumber.value,
      expDate: formState.inputs.expDate.value,
      cvv: formState.inputs.cvv.value,
    });
    props.handleNext();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Input
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a card name."

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            validators={[VALIDATOR_MINLENGTH(12),VALIDATOR_MAXLENGTH(12)]}
            onInput={inputHandler}
            errorText="Please enter a card number."

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            validators={[VALIDATOR_DATE()]}
            onInput={inputHandler}
            errorText="Please enter expiry date."

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            validators={[VALIDATOR_MINLENGTH(3),VALIDATOR_MAXLENGTH(3)]}
            onInput={inputHandler}
            errorText="Please enter cvv number."
            
            
          />
        </Grid>

        <Grid item >

            <Button onClick={props.handleBack} sx={{ml:{md:80,xs:19}, xs:3 ,md:1}}>Back</Button>
            </Grid>
        <Grid item xs={3} md={1}>
          <Button
            variant="contained"
            type="submit"
            onClick={onTrigger}
            disabled={!formState.isValid}
          >
            Next
          </Button>
          </Grid>

      </Grid>
    </>
  );
};

export default PaymentForm;
