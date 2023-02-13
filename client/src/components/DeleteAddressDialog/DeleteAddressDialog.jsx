import { Close } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import { useState } from 'react';

const DeleteAddressDialog = ({ address, open, handleDeleteAddressClose, handleDeleteAddress }) => {
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

  const handleSubmit = () => {
    addressState.isActive = false;
    handleDeleteAddress(addressState);
  };
  return (
    <Dialog open={open} onClose={handleDeleteAddressClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ backgroundColor: (theme)=>theme.palette.error.main }}>
          <Typography variant="h5">Delete Address</Typography>
          <IconButton
            edge="end"
            sx={{ color: 'white', right: 15, position: 'absolute' }}
            onClick={handleDeleteAddressClose}>
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Typography variant="body1" fontWeight={'bold'} fontSize={'1em'}>
          Are you sure you want to delete this address?
          <br></br>
          {`${address.country}, ${address.city}, ${address.street} ${address.houseNumber}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteAddressClose} color="secondaryButton" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressDialog;
