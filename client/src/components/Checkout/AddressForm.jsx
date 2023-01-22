import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckoutContext from "../../context/checkoutContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AddressForm(props) {
  const checkoutCntxt = useContext(CheckoutContext);
  const { handleNext } = props;
  const [isNextAvailable, setIsNextAvailable] = useState(false);

  const checkFormValidation = () => {
    for (let contactInfoField of Object.keys(checkoutCntxt.userInfo)) {
      if (
        checkoutCntxt.userInfo[contactInfoField].trim() === "" &&
        !(contactInfoField == "address2")
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
  }, [checkoutCntxt.userInfo]);

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ marginBottom: "1.5em" }} gutterBottom>
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
              checkoutCntxt?.userInfo?.fName && checkoutCntxt.userInfo.fName
            }
            placeholder={!checkoutCntxt?.userInfo?.fName && "First Name..."}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
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
              checkoutCntxt?.userInfo?.lName && checkoutCntxt.userInfo.lName
            }
            placeholder={!checkoutCntxt?.userInfo?.lName && "Last Name..."}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
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
              checkoutCntxt?.userInfo?.address1 &&
              checkoutCntxt.userInfo.address1
            }
            placeholder={!checkoutCntxt?.userInfo?.address1 && "Address..."}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={
              checkoutCntxt?.userInfo?.address2 &&
              checkoutCntxt.userInfo.address2
            }
            placeholder={!checkoutCntxt?.userInfo?.address2 && "Address 2..."}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={checkoutCntxt.userInfo.city && checkoutCntxt.userInfo.city}
            placeholder={!checkoutCntxt.userInfo.city && "City..."}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            inputProps={{ maxLength: 18, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={
              checkoutCntxt?.userInfo?.state && checkoutCntxt.userInfo.state
            }
            placeholder={!checkoutCntxt?.userInfo?.state && "State..."}
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 20, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={checkoutCntxt?.userInfo?.zip && checkoutCntxt.userInfo.zip}
            placeholder={!checkoutCntxt?.userInfo?.zip && "Zip..."}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            inputProps={{ maxLength: 8, minLength: 4 }}
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
              checkoutCntxt?.userInfo?.country &&
              checkoutCntxt?.userInfo?.country
            }
            placeholder={!checkoutCntxt?.userInfo?.country && "Country..."}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
