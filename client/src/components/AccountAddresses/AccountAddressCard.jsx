import { Edit, EditOutlined } from '@mui/icons-material';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

const AccountAddressCard = ({ address, handleEditAddressClick }) => {
  const [addressObject, setAddressObject] = useState(address);

  useEffect(() => {
    setAddressObject(address);
  }, [address]);
  return (
    <Paper variant="elevation" elevation={2} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} flexBasis={'100%'}>
            <Typography variant="body1" fontWeight={'bold'} fontSize={'1em'}>
              Address Info
            </Typography>
            <IconButton
              color="mainButton"
              sx={{ padding: 0 }}
              onClick={() => handleEditAddressClick(addressObject)}>
              <EditOutlined></EditOutlined>
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="caption" color={'GrayText'} fontWeight={'bold'} fontSize={'0.8em'}>
              Country
            </Typography>
          </div>
          <div>
            <Typography variant="caption" fontWeight={'bold'} fontSize={'0.8em'}>
              {addressObject.country}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="caption" color={'GrayText'} fontWeight={'bold'} fontSize={'0.8em'}>
              City
            </Typography>
          </div>
          <div>
            <Typography variant="caption" fontWeight={'bold'} fontSize={'0.8em'}>
              {addressObject.city}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="caption" color={'GrayText'} fontWeight={'bold'} fontSize={'0.8em'}>
              Street
            </Typography>
          </div>
          <div>
            <Typography variant="caption" fontWeight={'bold'} fontSize={'0.8em'}>
              {addressObject.street}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="caption" color={'GrayText'} fontWeight={'bold'} fontSize={'0.8em'}>
              House Number
            </Typography>
          </div>
          <div>
            <Typography variant="caption" fontWeight={'bold'} fontSize={'0.8em'}>
              {addressObject.houseNumber}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="caption" color={'GrayText'} fontWeight={'bold'} fontSize={'0.8em'}>
              ZIP
            </Typography>
          </div>
          <div>
            <Typography variant="caption" fontWeight={'bold'} fontSize={'0.8em'}>
              {addressObject.zipCode}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountAddressCard;
