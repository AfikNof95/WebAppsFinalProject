import './SideNavigation.css';

import { ArrowBackIos } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';

const DashboardMobileNavigation = ({
  drawerWidth,
  pages,
  handlePageClick,
  navigateToHomepage,
  pageName
}) => {
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
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardMobileNavigation;
