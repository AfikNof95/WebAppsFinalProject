import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AddressCard } from '../Address/AddressCard';
import AccountAddressCard from './AccountAddressCard';
import backendAPI from '../../api';
import { Alert, Grid, Paper, Skeleton, Snackbar } from '@mui/material';
import EditAddressDialog from '../EditAddressDialog/EditAddressDialog';
import DeleteAddressDialog from '../DeleteAddressDialog/DeleteAddressDialog';

const AccountAddresses = forwardRef(({ userId, openNewAddressDialog = false }, ref) => {
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({
    severity: 'error',
    message: 'An error occurred'
  });

  const handleAddAddress = () => {
    setSelectedAddress({});
    setIsEditDialogOpen(true);
  };

  const handleEditAddressClick = (address) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleEditAddressClose = () => {
    setSelectedAddress({});
    setIsEditDialogOpen(false);
  };
  const handleDeleteAddressClose = () => {
    setSelectedAddress({});
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteAddressConfirm = async (address) => {
    try {
      setIsLoading(true);
      await backendAPI.user.updateAddress(address);
      setIsDeleteDialogOpen(false);
      setSelectedAddress({});
      setAddressList((currentState) => {
        return currentState.filter(
          (currentAddressState) => currentAddressState._id !== address._id
        );
      });
      setSnackBarMessage({
        severity: 'success',
        message: 'Address deleted successfully!'
      });
    } catch (ex) {
      setSnackBarMessage({
        severity: 'error',
        message: "Couldn't delete address, please try again later!"
      });
    }
    setIsLoading(false);
  };
  const handleDeleteAddressClick = (address) => {
    setSelectedAddress(address);
    setIsDeleteDialogOpen(true);
  };

  const handleEditAddressSave = async (address) => {
    let isNew = !address._id;
    let newAddress;
    try {
      if (isNew) {
        const response = await backendAPI.user.addAddress({ ...address, ...{ user: userId } });
        newAddress = response.data;
        setAddressList((currentAddressState) => {
          return [...currentAddressState, newAddress];
        });
      } else {
        await backendAPI.user.updateAddress(address);
        setAddressList((currentState) => {
          return currentState.map((currentAddressState) => {
            if (currentAddressState._id === address._id) {
              return { ...currentAddressState, ...address };
            }
            return currentAddressState;
          });
        });
      }

      setSnackBarMessage({
        severity: 'success',
        message: 'Address updated successfully!'
      });
      setSelectedAddress({});

      setIsEditDialogOpen(false);
    } catch (ex) {
      setSnackBarMessage({
        severity: 'error',
        message: "Couldn't update address, please try again later!"
      });
    }
    setShowSnackBar(true);
  };

  useEffect(() => {
    const fetchUserAddresses = async () => {
      const response = await backendAPI.user.getAddresses(userId);
      setAddressList(response.data);
      setIsLoading(false);
    };
    fetchUserAddresses();
  }, []);

  useImperativeHandle(ref, () => ({ handleAddAddress }));

  return (
    <>
      {isEditDialogOpen && (
        <EditAddressDialog
          open={isEditDialogOpen}
          address={selectedAddress}
          handleClose={handleEditAddressClose}
          handleSave={handleEditAddressSave}></EditAddressDialog>
      )}
      {isDeleteDialogOpen && (
        <DeleteAddressDialog
          open={isDeleteDialogOpen}
          address={selectedAddress}
          handleDeleteAddressClose={handleDeleteAddressClose}
          handleDeleteAddress={handleDeleteAddressConfirm}></DeleteAddressDialog>
      )}

      <Grid container spacing={2}>
        {isLoading && (
          <>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper sx={{ height: '100%', padding: 2 }}>
                <Skeleton variant="text" sx={{ marginBottom: 3 }}></Skeleton>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="text"></Skeleton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        )}
        {addressList.map((address) => (
          <Grid item xs={12} sm={6} lg={4} key={address._id}>
            <AccountAddressCard
              address={address}
              handleEditAddressClick={handleEditAddressClick}
              handleDeleteAddressClick={handleDeleteAddressClick}></AccountAddressCard>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <Alert
          severity={snackBarMessage.severity}
          variant="filled"
          sx={{ width: '100%', marginTop: 3 }}>
          {snackBarMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
});

export default AccountAddresses;
