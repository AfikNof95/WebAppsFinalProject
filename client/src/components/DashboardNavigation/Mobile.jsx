import './SideNavigation.css';

import { ArrowBackIos, CellTower } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import BroadCast from './BroadCast';
import { useState } from 'react';

const DashboardMobileNavigation = ({
  drawerWidth,
  pages,
  handlePageClick,
  navigateToHomepage,
  pageName,
  sendBroadCast
}) => {
  const [isBroadCastOpen, setIsBroadCastOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleOpenBroadCast = (event) => {
    setIsBroadCastOpen((currentState) => {
      return !currentState;
    });
    setAnchorEl(event.currentTarget);
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
      <Box sx={{ overflow: 'auto', color: 'black' }}>
        <List>
          <Tooltip title="Go back to homepage" placement="right">
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5
                }}
                onClick={navigateToHomepage}>
                <ListItemIcon
                  sx={{
                    color: 'white',
                    mr: 'auto',
                    minWidth: 0,
                    justifyContent: 'center'
                  }}>
                  <ArrowBackIos></ArrowBackIos>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {pages.map(
            (page) =>
              page.icon && (
                <Tooltip title={page.name} placement="right" key={page.name}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      className={'side-nav-list-item-mobile'}
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5
                      }}
                      selected={page.name.toLowerCase() === pageName}
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
              )
          )}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              className={'side-nav-list-item-mobile'}
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5
              }}
              selected={'Broadcast' === pageName}
              onClick={toggleOpenBroadCast}>
              <ListItemIcon
                sx={{
                  color: 'black',
                  mr: 'auto',
                  minWidth: 0,
                  justifyContent: 'center'
                }}>
                <CellTower></CellTower>
              </ListItemIcon>
            </ListItemButton>

            <BroadCast
              isMobile={true}
              anchorEl={anchorEl}
              isBroadCastOpen={isBroadCastOpen}
              sendBroadCast={sendBroadCast}
              toggleOpenBroadCast={toggleOpenBroadCast}></BroadCast>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardMobileNavigation;
