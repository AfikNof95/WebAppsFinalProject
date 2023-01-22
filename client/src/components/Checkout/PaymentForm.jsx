import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutContext from "../../context/checkoutContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function PaymentForm(props) {
  const checkoutCntxt = useContext(CheckoutContext);
  const { handleNext, handleBack } = props;
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [expDate, setExpDate] = useState(null);

  const checkFormValidation = () => {
    for (let payInfo of Object.keys(checkoutCntxt.paymentInfo)) {
      if (
        checkoutCntxt.paymentInfo[payInfo].trim() === "" &&
        !(payInfo == "expDate")
      ) {
        setIsNextAvailable(false);
        return;
      }
    }
    setIsNextAvailable(true);
    return;
  };

  useEffect(() => {
    checkFormValidation();
  }, []);

  useEffect(() => {
    checkFormValidation();
  }, [checkoutCntxt.paymentInfo]);

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ marginBottom: "1.5em" }} gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={
              checkoutCntxt?.paymentInfo?.cardName &&
              checkoutCntxt.paymentInfo.cardName
            }
            placeholder={
              !checkoutCntxt?.paymentInfo?.cardName && "Card holder..."
            }
            inputProps={{ maxLength: 25, minLength: 2 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={
              checkoutCntxt?.paymentInfo?.cardNumber &&
              checkoutCntxt.paymentInfo.cardNumber
            }
            placeholder={
              !checkoutCntxt?.paymentInfo?.cardNumber && "Card number..."
            }
            inputProps={{ maxLength: 19, minLength: 10 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              id="expDate"
              name="expDate"
              label="Expiration Date Option"
              value={expDate}
              inputFormat="MM/YYYY"
              onChange={(newexpDate) => {
                setExpDate(newexpDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={
              checkoutCntxt?.paymentInfo?.cvv && checkoutCntxt.paymentInfo.cvv
            }
            placeholder={!checkoutCntxt?.paymentInfo?.cvv && "CVV..."}
            inputProps={{ maxLength: 3, minLength: 3 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 3, ml: 1 }}
          disabled={!isNextAvailable}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
