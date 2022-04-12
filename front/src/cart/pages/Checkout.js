import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Tula Fly
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

const theme = createTheme();

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formAddressCallBack, setFormAddressCallBack] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const addresCallBackHandaler = (formData) => {
    setFormAddressCallBack({
      firstName: formData.firstName,
      lastName: formData.lastName,
      address1: formData.address1,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
    });
  };
  const [formpaymentCallBack, setFormPaymentCallBack] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const paymentCallBackHandaler = (formData) => {
    setFormPaymentCallBack({
      cardName: formData.cardName,
      cardNumber: formData.cardNumber,
      expDate: formData.expDate,
      cvv: formData.cvv,
    });
  };

  const steps = ["Shipping address", "Payment details", "Review your order"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            addresCallBackHandaler={addresCallBackHandaler}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentCallBackHandaler={paymentCallBackHandaler}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <Review
            formpaymentCallBack={formpaymentCallBack}
            formAddressCallBack={formAddressCallBack}
            handleNext={handleNext}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="md"
        sx={{ mb: 6, mt: { xl: 25, xs: 22, md: 25 } }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{Math.floor(Math.random() * 100000000)}.
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex" }}>
                  {activeStep === steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: { xs: 22, md: 80 } }}
                    >
                      Place order
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
