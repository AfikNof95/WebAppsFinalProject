import './SideNavigation.css';
import { useState, useEffect } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import SideNavigationIcons from './SideNavigationIcons';
const MobileSideNavigation = ({ drawerWidth, pages, deviceType, handlePageClick }) => {
  const { currentUser, getUserProfilePicture } = useAuth();
  const [selectedPageName, setSelectedPageName] = useState('accountInformation');
  const icons = SideNavigationIcons;
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
      <Box sx={{ overflow: 'auto', color: 'black' }}>
        <List>
          {() => {
            pages.map((page, index) => {
              return (
                <Tooltip title={page.name} placement="right" key={page.name}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      className="side-nav-list-item-mobile"
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5
                      }}
                      selected={page.name === selectedPageName}
                      onClick={() => handlePageClick(page.name)}>
                      <ListItemIcon
                        sx={{
                          color: page._name === selectedPageName ? 'white' : 'black',
                          mr: 'auto',
                          minWidth: 0,
                          justifyContent: 'center'
                        }}>
                        {SideNavigationIcons[page.icon]}
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              );
            });
          }}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileSideNavigation;
