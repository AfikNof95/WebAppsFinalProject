import { ArrowBackIos } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const DashboardDesktopNavigation = ({
  drawerWidth,
  pages,
  handlePageClick,
  navigateToHomepage,
  pageName
}) => {
  const { currentUser, getUserProfilePicture } = useAuth();

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
              <ArrowBackIos sx={{ color: 'white' }}></ArrowBackIos>
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
                  selected={pageName === page.name.toLowerCase()}>
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

export default DashboardDesktopNavigation;
