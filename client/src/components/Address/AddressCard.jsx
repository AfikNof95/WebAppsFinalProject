import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

export function AddressCard(props) {
  const {
    addressId,
    user,
    street,
    houseNumber,
    city,
    zipCode,
    country,
    setIsNextAvailable,
    setChosenAddress,
    chosenAddress,
    emitAddressUpdate
  } = props;
  const [open, setOpen] = React.useState(false);
  const [updatedAddress, setUpdatedAddress] = useState({
    addressId,
    user,
    street,
    houseNumber,
    city,
    zipCode,
    country
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:2308/Address/id/${addressId}`,
        updatedAddress
      );
      emitAddressUpdate(updatedAddress);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRemove = () => {
    try {
      // axios
      //     .delete('api/address/' + { addresId })
      //     .then((response) => {
      //         console.log(response.data)
      //     })
      //     .catch((error) => {
      //         console.error(error)
      //     })
    } catch (err) {
      console.log('Error! Could not delete the address');
    }
  };

  const onChoose = () => {
    try {
      setChosenAddress({ street, houseNumber, city, zipCode, country });
      setIsNextAvailable(true);
      // add style = box-shadow: 7px 7px 8px green;
    } catch (err) {
      console.log('Error! Could not set the ChosenAddress state');
    } finally {
      console.log('successfully chose address');
    }
  };

  const handleChange = async (event) => {
    setUpdatedAddress({
      ...updatedAddress,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
            <Typography variant="h5">Edit Address</Typography>
            <IconButton
              edge="end"
              sx={{ color: 'white', right: 15, position: 'absolute' }}
              onClick={handleClose}>
              <Close></Close>
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                defaultValue={country}
                variant="standard"
                inputProps={{ maxLength: 22, minLength: 2 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                defaultValue={city}
                variant="standard"
                inputProps={{ maxLength: 18, minLength: 2 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="street"
                name="street"
                label="Street"
                defaultValue={street}
                variant="standard"
                inputProps={{ maxLength: 22, minLength: 2 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="houseNumber"
                name="houseNumber"
                type={'number'}
                label="House Number"
                defaultValue={houseNumber}
                variant="standard"
                inputProps={{ maxLength: 22, minLength: 2 }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                id="zipCode"
                name="zipCode"
                type="number"
                label="ZIP Code"
                defaultValue={zipCode}
                variant="standard"
                inputProps={{ maxLength: 8, minLength: 4 }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondaryButton.light">
            Cancel
          </Button>
          <Button onClick={handleSave} color="mainButton">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ display: 'flex', padding: 2, marginTop: 2 }} elevation={1}>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {street} {houseNumber}, {city}
          </Typography>
          <Typography variant="body2">
            {zipCode}, {country}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            width: '60%'
          }}>
          <CardActions>
            <Button size="small" onClick={onChoose}>
              Choose
            </Button>
            <Button size="small" onClick={handleClickOpen}>
              Edit
            </Button>
            <Button size="small" onClick={onRemove}>
              Remove
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
