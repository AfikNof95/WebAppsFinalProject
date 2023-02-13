import { Close } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

const EditAddressDialog = ({ address, open, handleClose, handleSave }) => {
  const [addressState, setAddressState] = useState(() => {
    return {
      ...{
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zipCode: ''
      },
      ...address
    };
  });
  const [errors, setErrors] = useState({
    country: false,
    city: false,
    street: false,
    houseNumber: false,
    zipCode: false
  });
  const handleChange = (event) => {
    setErrors((currentErrorsState) => {
      return { ...currentErrorsState, ...{ [event.target.name]: false } };
    });
    setAddressState((currentState) => {
      return { ...currentState, ...{ [event.target.name]: event.target.value } };
    });
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { ...errors };

    for (let [key, value] of Object.entries(addressState)) {
      if (errors[key] === undefined) {
        continue;
      }
      if (!value || (value.trim && value.trim() === '')) {
        isValid = false;
        newErrors[key] = true;
      }

      setErrors(newErrors);
    }

    if (isValid) {
      handleSave(addressState);
    }
  };
  return (
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
              value={addressState.country}
              variant="standard"
              inputProps={{ maxLength: 22, minLength: 2 }}
              onChange={handleChange}
              error={errors.country}
              helperText={errors.country ? 'Please enter a valid country' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              value={addressState.city}
              variant="standard"
              inputProps={{ maxLength: 18, minLength: 2 }}
              onChange={handleChange}
              error={errors.city}
              helperText={errors.city ? 'Please enter a valid city' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="street"
              name="street"
              label="Street"
              value={addressState.street}
              variant="standard"
              inputProps={{ maxLength: 22, minLength: 2 }}
              onChange={handleChange}
              error={errors.street}
              helperText={errors.street ? 'Please enter a valid street' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="houseNumber"
              required
              name="houseNumber"
              type={'number'}
              label="House Number"
              value={addressState.houseNumber}
              variant="standard"
              inputProps={{ maxLength: 22, minLength: 2 }}
              onChange={handleChange}
              error={errors.houseNumber}
              helperText={errors.houseNumber ? 'Please enter a valid house number' : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              type="number"
              label="ZIP Code"
              value={addressState.zipCode}
              variant="standard"
              inputProps={{ maxLength: 8, minLength: 4 }}
              onChange={handleChange}
              error={errors.zipCode}
              helperText={errors.zipCode ? 'Please enter a valid ZIP' : ''}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondaryButton" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="mainButton" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;
