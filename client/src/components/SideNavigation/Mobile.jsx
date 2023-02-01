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
import Filters from './Filters';
import SideNavigationIcons from './SideNavigationIcons';
const MobileSideNavigation = ({
  drawerWidth,
  categories,
  deviceType,
  handleCategoryClick,
  resetCategory,
  priceRange,
  selectedCategoryId
}) => {
  const { currentUser, getUserProfilePicture } = useAuth();
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
          {(() => {
            if (categories) {
              const ListItems = categories.map((category, index) => {
                return (
                  <Tooltip title={category.name} placement="right" key={category._id}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        className="side-nav-list-item-mobile"
                        sx={{
                          minHeight: 48,
                          justifyContent: 'center',
                          px: 2.5
                        }}
                        selected={category._id === selectedCategoryId}
                        onClick={() => handleCategoryClick(category._id)}>
                        <ListItemIcon
                          sx={{
                            color: category._id === selectedCategoryId ? 'white' : 'black',
                            mr: 'auto',
                            minWidth: 0,
                            justifyContent: 'center'
                          }}>
                          {SideNavigationIcons[category.icon]}
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                );
              });
              return (
                <>
                  <Filters
                    deviceType={deviceType}
                    selectedCategoryId={selectedCategoryId}
                    priceRange={priceRange}></Filters>

                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title="All Products" placement="right">
                      <ListItemButton
                        className="side-nav-list-item-mobile"
                        selected={!selectedCategoryId}
                        onClick={() => resetCategory()}
                        sx={{
                          minHeight: 48,
                          justifyContent: 'center',
                          px: 2.5
                        }}>
                        <ListItemIcon
                          sx={{
                            color: !selectedCategoryId ? 'white' : 'black',
                            mr: 'auto',
                            minWidth: 0,
                            justifyContent: 'center'
                          }}>
                          {SideNavigationIcons.AllProducts}
                        </ListItemIcon>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>

                  {ListItems}
                </>
              );
            } else {
              return <CircularProgress></CircularProgress>;
            }
          })()}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileSideNavigation;
