import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckoutContext from "../../context/checkoutContext";

// Add validations, grey the next if not valid

export default function AddressForm() {
  const checkoutCntxt = useContext(CheckoutContext);

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
            value={
              checkoutCntxt?.tmpUserInfo?.fName &&
              checkoutCntxt.tmpUserInfo.fName
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.fName && "First Name..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.lName &&
              checkoutCntxt.tmpUserInfo.lName
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.lName && "Last Name..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.address1 &&
              checkoutCntxt.tmpUserInfo.address1
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.address1 && "Address..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.address2 &&
              checkoutCntxt.tmpUserInfo.address2
            }
            placeholder={
              !checkoutCntxt?.tmpUserInfo?.address2 && "Address 2..."
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
            value={
              checkoutCntxt.tmpUserInfo.city && checkoutCntxt.tmpUserInfo.city
            }
            placeholder={!checkoutCntxt.tmpUserInfo.city && "City..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.state &&
              checkoutCntxt.tmpUserInfo.state
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.state && "State..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.zip && checkoutCntxt.tmpUserInfo.zip
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.zip && "Zip..."}
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
            value={
              checkoutCntxt?.tmpUserInfo?.country &&
              checkoutCntxt?.tmpUserInfo?.country
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.country && "Country..."}
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
