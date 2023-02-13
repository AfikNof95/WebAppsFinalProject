import './AddressCard.css';
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
import { Close, Edit } from '@mui/icons-material';

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
    emitAddressUpdate,
    setAddressId
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

  const handleClickOpen = (event) => {
    event.stopPropagation();
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

  const onRemove = async () => {
    try {
      const response = await axios.delete(`http://localhost:2308/Address/id/${addressId}`);
    } catch (err) {
      console.log('Error! Could not delete the address');
      console.log(err);
    }
  };

  const onChoose = () => {
    try {
      setChosenAddress({
        street,
        houseNumber,
        city,
        zipCode,
        country,
        addressId
      });
      setAddressId(addressId);
      setIsNextAvailable(true);
    } catch (err) {
      console.log('Error! Could not set the ChosenAddress state');
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
          <Button onClick={handleClose} color="secondaryButton" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSave} color="mainButton" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className={addressId === chosenAddress.addressId ? 'selected-address' : ''}
        sx={{
          display: 'flex',
          padding: 2,
          marginTop: 2,
          cursor: 'pointer',
          transition: '0.3s ease all'
        }}
        elevation={1}
        onClick={onChoose}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Typography variant="body2" gutterBottom>
              {street} {houseNumber}, {city}
            </Typography>
            <Typography variant="body2">
              {zipCode}, {country}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small" onClick={handleClickOpen}>
              <Edit></Edit>
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
