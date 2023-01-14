import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

// Add Validations

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function NewCheckout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [contactInfo, setContactInfo] = useState({
    firstName: "", // should check - less than 25 letters
    lastName: "", // should check - less than 25 letters
    address1: "", // should check - less than 25 letters
    address2: "", // should check - less than 25 letters
    city: "", // should check - less than 25 letters
    state: "", // should check - less than 25 letters
    zip: "", // should check - numbers only
    country: "", // should check - less than 25 letters
  });
  const [userPayment, setUserPayment] = useState({
    cardsName: "", // Check for full name
    cardsNumber: "", // Validate numbers only
    expiryDate: "", // validate date format
    cvv: "", // validate 3 digits only
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const checkFormValidation = () => {
    for (let contactInfoField of Object.keys(contactInfo)) {
      if (
        contactInfo[contactInfoField].trim() === "" &&
        !(contactInfoField == "address2")
      ) {
        setIsNextAvailable(false);
        return;
      }
    }
    setIsNextAvailable(true);
  };

  // useEffect(() => {
  //   checkFormValidation();
  // }, [contactInfo]);

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
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {/* Should be disable when not validated */}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={activeStep < steps.length - 1 && !isNextAvailable}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
