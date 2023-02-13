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
const MobileSideNavigation = ({ drawerWidth, pages, pageName, handlePageClick }) => {
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
          {pages.map((page) => (
            <Tooltip title={page.name} placement="right" key={page.name}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  className={"side-nav-list-item-mobile"}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5
                  }}
                  selected={page.name === pageName}
                  onClick={() => handlePageClick(page.name)}>
                  <ListItemIcon
                    sx={{
                      color: 'black',
                      mr: 'auto',
                      minWidth: 0,
                      justifyContent: 'center'
                    }}>
                    {page.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileSideNavigation;
