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
  const { isNextAvailable, setIsNextAvailable, handleNext, handleBack } = props;
  const [expDate, setExpDate] = useState(null);

  // const [addressErrors, setAddressErrors] = useState({});
  // let typoErros = validate(form);
  // if (Object.keys(newErrors).length > 0) {
  //   setErrors(newErrors);
  // }
  // const validate = (formData) => {
  //   const errors = {};
  //   if (!formData.name) {
  //     errors.name = "Name is required";
  //   }
  //   if (!formData.email) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     errors.email = "Email is invalid";
  //   }
  //   if (!formData.password) {
  //     errors.password = "Password is required";
  //   } else if (formData.password.length < 8) {
  //     errors.password = "Password must be at least 8 characters";
  //   }
  //   return errors;
  // };

  const checkFormValidation = () => {
    for (let payInfo of Object.keys(checkoutCntxt.tmpPayment)) {
      if (checkoutCntxt.tmpPayment[payInfo].trim() === "") {
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
  }, [checkoutCntxt.tmpPayment]);

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
              checkoutCntxt?.tmpPayment?.cardName &&
              checkoutCntxt.tmpPayment.cardName
            }
            placeholder={
              !checkoutCntxt?.tmpPayment?.cardName && "Card holder..."
            }
            inputProps={{ maxLength: 25, minLength: 2 }}
            onChange={checkoutCntxt.handlePaymentChange}
          />
          {/* {errors.cardName && <p>{errors.cardName}</p>} */}
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
          {/* {errors.cardNumber && <p>{errors.cardNumber}</p>} */}
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
          {/* {errors.expDate && <p>{errors.expDate}</p>} */}
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              id="expDate"
              name="expDate"
              label="Expiration Date Option"
              value={expDate}
              onChange={(newexpDate) => {
                setExpDate(newexpDate);
              }}
              // Damn that doesnot change
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
