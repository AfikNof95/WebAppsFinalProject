import { useState, useEffect } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Avatar,
  Typography
} from '@mui/material';

import { useAuth } from '../../context/AuthContext';
const DesktopSideNavigation = ({ drawerWidth, deviceType, pages, handlePageClick, pageName }) => {
  const { currentUser, getUserProfilePicture } = useAuth();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      PaperProps={{
        width: `${drawerWidth}`,
        style: { backgroundColor: 'white' }
      }}
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}>
      <Toolbar />
      <Box sx={{ overflow: 'auto', color: 'black' }} paddingTop={3}>
        {currentUser && (
          <>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} paddingBottom={3}>
              <Avatar src={getUserProfilePicture()} sx={{ width: 150, height: 150 }}></Avatar>
              <Typography variant="body1" fontWeight={'bold'}>
                {currentUser.displayName}
              </Typography>
              <Typography variant="caption" color={'GrayText'}>
                {currentUser.email}
              </Typography>
            </Box>
            <Divider></Divider>
          </>
        )}
        <List>
          {pages.map((page, index) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton
                className={'side-nav-list-item'}
                onClick={() => handlePageClick(page.name)}
                selected={pageName === page.name}>
                <ListItemIcon sx={{ color: 'black' }}>{page.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: '0.9em',
                    fontWeight: 'bold'
                  }}
                  primary={page.name}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DesktopSideNavigation;
