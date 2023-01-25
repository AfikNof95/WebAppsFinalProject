import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const steps = ["Shipping address", "Payment details", "Review your order"];
const theme = createTheme();

export default function NewCheckout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextAvailable, setIsNextAvailable] = useState(true);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            isNextAvailable={isNextAvailable}
            setIsNextAvailable={setIsNextAvailable}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <PaymentForm
            isNextAvailable={isNextAvailable}
            setIsNextAvailable={setIsNextAvailable}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <Review
            isNextAvailable={isNextAvailable}
            setIsNextAvailable={setIsNextAvailable}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 12 }}>
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
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #11223344. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}