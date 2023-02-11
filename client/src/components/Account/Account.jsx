import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Typography, Modal, Box, Input, Toolbar } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WarningIcon from '@mui/icons-material/Warning';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText
} from '@mui/material';
import AccountSideNavigation from '../AccountSideNavigation/AccountSideNavigation';
import useScreenSize from '../../hooks/useScreenSize.js';
import AccountPersonalDetails from './AccountPersonalDetails';
import AccountOrdersHistory from './AccountOrdersHistory';

const AccountPage = () => {
  const locationState = useLocation();

  const { getUser, isUserSignedIn, getUserProfilePicture, currentUser } = useAuth();
  const [accountPage, setAccountPage] = useState(null);

  const [screenSize] = useScreenSize();
  const [drawerWidth, setDrawerWidth] = useState(() => {
    return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
  });

  let user = getUser();

  useEffect(() => {
    if (locationState.state && locationState.state.pageName) {
      setAccountPage(locationState.state.pageName);
    }
  }, [locationState]);

  useEffect(() => {
    setDrawerWidth(() => {
      return screenSize === 'sm' || screenSize === 'xs' ? 80 : 300;
    });
  }, [screenSize]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{ backgroundColor: '#fcfcfe' }}
      height={'100%'}
      overflow={'auto'}>
      <Toolbar></Toolbar>
      <Box display={'flex'}>
        <AccountSideNavigation drawerWidth={drawerWidth} handlePageClick></AccountSideNavigation>
        <Box width={`calc(100vw - ${drawerWidth}px)`} height={`calc(100vh - 64px)`}>
          {(() => {
            if (accountPage === 'Orders History') {
              return <AccountOrdersHistory userId={currentUser.localId}></AccountOrdersHistory>;
            }
            return <AccountPersonalDetails></AccountPersonalDetails>;
          })()}
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPage;
