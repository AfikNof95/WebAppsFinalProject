import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckoutContext from "../../context/checkoutContext";

// Add validations, grey the next if not valid
// userCart: tmpCart, userInfo: tmpUserInfo, paymentInfo: tmpPayment,

export default function AddressForm() {
  const checkoutCntxt = useContext(CheckoutContext);
  console.log(checkoutCntxt.userInfo);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="fName"
            label="First name"
            placeholder={
              checkoutCntxt.userInfo.fName && checkoutCntxt.userInfo.fName
            }
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lName"
            label="Last name"
            placeholder={
              checkoutCntxt.userInfo.lName && checkoutCntxt.userInfo.lName
            }
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            placeholder={
              checkoutCntxt.userInfo.street && checkoutCntxt.userInfo.street
            }
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            placeholder={
              checkoutCntxt.userInfo.address2 && checkoutCntxt.userInfo.address2
            }
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            placeholder={
              checkoutCntxt.userInfo.city && checkoutCntxt.userInfo.city
            }
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            placeholder={
              checkoutCntxt.userInfo.state && checkoutCntxt.userInfo.state
            }
            fullWidth
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            placeholder={
              checkoutCntxt.userInfo.zip && checkoutCntxt.userInfo.zip
            }
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            placeholder={
              checkoutCntxt.userInfo.country && checkoutCntxt.userInfo.country
            }
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
