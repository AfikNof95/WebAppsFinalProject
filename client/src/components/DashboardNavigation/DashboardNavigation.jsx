import './DashboardNavigation.css';

import {
  Drawer,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  CircularProgress,
  Avatar,
  Typography,
  IconButton
} from '@mui/material';
import UsersIcon from '@mui/icons-material/Group';
import OrdersIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIOS from '@mui/icons-material/ArrowBackIos';
import ProductsIcon from '@mui/icons-material/Store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { borderRadius, height } from '@mui/system';

const DashboardNavigation = ({ drawerWidth = 300, handlePageClick, selectedPage }) => {
  const { currentUser, getUserProfilePicture } = useAuth();
  const navigate = useNavigate();
  const pages = [
    {
      name: 'Users',
      icon: <UsersIcon></UsersIcon>,
      link: '/'
    },
    {
      name: 'Products',
      icon: <ProductsIcon></ProductsIcon>,
      link: '/products'
    },
    {
      name: 'Orders',
      icon: <OrdersIcon></OrdersIcon>,
      link: '/orders'
    },
    {
      type: 'Divider',
      name: 'Divider'
    },
    {
      type: 'Title',
      title: 'Analytics',
      name: 'Analytics'
    },
    {
      name: 'Overview',
      icon: <AnalyticsIcon></AnalyticsIcon>,
      link: '/overview'
    }
  ];

  const navigateToHomepage = () => {
    navigate({ pathname: '/' });
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      PaperProps={{
        width: `${drawerWidth}`,
        style: { backgroundColor: 'var(--main-app-blue)' }
      }}
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}>
      <Box sx={{ overflow: 'auto' }} padding={3}>
        {currentUser && (
          <>
            <IconButton sx={{ marginBottom: 3, color: 'white' }} onClick={navigateToHomepage}>
              <ArrowBackIOS sx={{ color: 'white' }}></ArrowBackIOS>
              Go Back to Store
            </IconButton>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} marginBottom={3}>
              <Avatar
                sx={{
                  height: 80,
                  width: 80
                }}
                src={getUserProfilePicture()}></Avatar>
              <Box display="flex" flexDirection="column" marginLeft={1}>
                <Typography variant="body1" fontWeight={'bold'} color="white">
                  {currentUser.displayName}
                </Typography>
                <Typography variant="caption" color="white">
                  {currentUser.email}
                </Typography>
              </Box>
            </Box>
            <Divider></Divider>
          </>
        )}
        <List className="nav-item-color">
          {pages.map((page, index) => {
            if (page.type === 'Divider') return <Divider key={page.name}></Divider>;
            if (page.type === 'Title')
              return (
                <ListItem key={page.name}>
                  <ListItemText>{page.title}</ListItemText>
                </ListItem>
              );

            return (
              <ListItem key={page.name} onClick={() => handlePageClick(page.name)}>
                <ListItemButton
                  sx={{ borderRadius: '30px' }}
                  selected={selectedPage === page.name.toLowerCase()}>
                  <ListItemIcon color="info">{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name}></ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardNavigation;
