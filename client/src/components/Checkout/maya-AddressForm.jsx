import React, { useEffect, useState, useRef } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AddressForm(props) {

  const { userInfo, handleFormChange } = useShoppingCart();
  const { handleNext } = props;
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const zipCodeCode = useRef();
  const city = useRef();
  const country = useRef();
  const houseNumber = useRef();
  const street = useRef();
  let updateUserAdress = useRef()
  const { getUser } = useAuth()
  const user = getUser()

  const checkFormValidation = () => {
    for (let contactInfoField of Object.keys(userInfo)) {
      if (
        userInfo[contactInfoField].trim() === "" &&
        !(contactInfoField == "houseNumber")
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
  }, [userInfo]);

  useEffect(() => {
    updateUserAdress.current = async () => {
      const response = await axios.post(`http://localhost:2309/Address`, {
        country: country.current.value,
        city: city.current.value,
        street: street.current.value, 
        houseNumber: houseNumber.current.value,
        zipCodeCode: zipCodeCode.current.value,
        user: user.localId
      });
      handleNext()
    };
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ marginBottom: "1.5em" }} gutterBottom>
        Address for shipping
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="fName"
            label="First name"
            value={userInfo?.fName && userInfo.fName}
            placeholder={!userInfo?.fName && "First Name..."}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lName"
            label="Last name"
            value={userInfo?.lName && userInfo.lName}
            placeholder={!userInfo?.lName && "Last Name..."}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="street"
            name="street"
            label="Street Address"
            value={userInfo?.street && userInfo.street}
            placeholder={!userInfo?.street && "Address..."}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={street}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="houseNumber"
            name="houseNumber"
            label="House Number"
            value={userInfo?.houseNumber && userInfo.houseNumber}
            placeholder={!userInfo?.houseNumber && "Address 2..."}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={houseNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={userInfo.city && userInfo.city}
            placeholder={!userInfo.city && "City..."}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            inputProps={{ maxLength: 18, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={userInfo?.state && userInfo.state}
            placeholder={!userInfo?.state && "State..."}
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 20, minLength: 2 }}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zipCode"
            name="zipCode"
            label="zipCode / Postal code"
            value={userInfo?.zipCode && userInfo.zipCode}
            placeholder={!userInfo?.zipCode && "zipCode..."}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            inputProps={{ maxLength: 8, minLength: 4 }}
            onChange={handleFormChange}
            inputRef={zipCodeCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={userInfo?.country && userInfo?.country}
            placeholder={!userInfo?.country && "Country..."}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={handleFormChange}
            inputRef={country}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          to="/"
          sx={{ mt: 3, ml: 1 }}
          component={RouterLink}
        >
          Back home
        </Button>
        <Button
          variant="contained"
          onClick={() => updateUserAdress.current()}
          sx={{ mt: 3, ml: 1 }}
          disabled={!isNextAvailable}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
