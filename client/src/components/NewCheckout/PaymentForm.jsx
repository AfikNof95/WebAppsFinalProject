import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutContext from "../../context/checkoutContext";

// validation and grey btn

export default function PaymentForm() {
  const checkoutCntxt = useContext(CheckoutContext);

  const [expDate, setExpDate] = useState(null);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
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
              checkoutCntxt?.tmpPayment?.cardName &&
              checkoutCntxt.tmpPayment.cardName
            }
            placeholder={
              !checkoutCntxt?.tmpPayment?.cardName && "Card holder..."
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
              checkoutCntxt?.tmpPayment?.cardNumber &&
              checkoutCntxt.tmpPayment.cardNumber
            }
            placeholder={
              !checkoutCntxt?.tmpPayment?.cardNumber && "Card number..."
            }
            inputProps={{ maxLength: 19, minLength: 10 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={
              checkoutCntxt?.tmpPayment?.expDate &&
              checkoutCntxt.tmpPayment.expDate
            }
            placeholder={
              !checkoutCntxt?.tmpPayment?.expDate && "Expiry date..."
            }
            inputProps={{ maxLength: 5, minLength: 5 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Exp Date Option"
              value={expDate}
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
              checkoutCntxt?.tmpPayment?.cvv && checkoutCntxt.tmpPayment.cvv
            }
            placeholder={!checkoutCntxt?.tmpPayment?.cvv && "CVV..."}
            inputProps={{ maxLength: 3, minLength: 3 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
