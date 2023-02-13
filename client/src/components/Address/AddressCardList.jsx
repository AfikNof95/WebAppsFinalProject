import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { AddressCard } from './AddressCard';
import axios from 'axios';

export const AddressCardList = (props) => {
  const { setIsNextAvailable, setChosenAddress, chosenAddress, currentUser, setAddressId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:2308/Address/User/${currentUser.localId}`);
      setAddressList([...response.data]);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddressSave = (newAddressData) => {
    setAddressList((currentState) => {
      return currentState.map((address) => {
        if (address._id === newAddressData.addressId) {
          return { ...address, ...newAddressData };
        }
        return address;
      });
    });
  };

  //  Also use effect wehn the array changes due deleting or editing

  return isLoading ? (
    <Box display={'flex'} justifyContent={'center'} width="100%">
      <CircularProgress></CircularProgress>
    </Box>
  ) : addressList.length !== 0 ? (
    <Grid container spacing={2}>
      {addressList.map((address) => (
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={address?._id}>
          <AddressCard
            addressId={address?._id}
            user={address.user}
            street={address?.street}
            houseNumber={address?.houseNumber}
            city={address?.city}
            zipCode={address?.zipCode}
            country={address?.country}
            currentUser={currentUser}
            setAddressId={setAddressId}
            setIsNextAvailable={setIsNextAvailable}
            setChosenAddress={setChosenAddress}
            chosenAddress={chosenAddress}
            emitAddressUpdate={handleAddressSave}></AddressCard>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        You have not set any addresses in your profile yet!
      </Typography>
    </Box>
  );
};
