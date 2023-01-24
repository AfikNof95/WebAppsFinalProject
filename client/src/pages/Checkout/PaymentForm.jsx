import React, { useContext, useState, useEffect } from "react";
import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function PaymentForm(props) {
  const { paymentInfo, handlePaymentChange } = useShoppingCart();
  const { handleNext, handleBack } = props;
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [expDate, setExpDate] = useState(null);

  const checkFormValidation = () => {
    for (let payInfo of Object.keys(paymentInfo)) {
      if (paymentInfo[payInfo].trim() === "" && !(payInfo == "expDate")) {
        setIsNextAvailable(false);
        return;
      }
    }
    setIsNextAvailable(true);
    return;
  };

  useEffect(() => {
    resetPayment();
    checkFormValidation();
  }, []);

  useEffect(() => {
    checkFormValidation();
  }, [paymentInfo]);

  const resetPayment = () => {
    return handlePaymentChange;
  };

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
            value={paymentInfo?.cardName && paymentInfo.cardName}
            placeholder={!paymentInfo?.cardName && "Card holder..."}
            inputProps={{ maxLength: 25, minLength: 2 }}
            onChange={handlePaymentChange}
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
            value={paymentInfo?.cardNumber && paymentInfo.cardNumber}
            placeholder={!paymentInfo?.cardNumber && "Card number..."}
            inputProps={{ maxLength: 19, minLength: 10 }}
            onChange={handlePaymentChange}
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
            value={paymentInfo?.cvv && paymentInfo.cvv}
            placeholder={!paymentInfo?.cvv && "CVV..."}
            inputProps={{ maxLength: 3, minLength: 3 }}
            onChange={handlePaymentChange}
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
