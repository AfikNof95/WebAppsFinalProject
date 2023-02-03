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
  CircularProgress,
  Collapse,
  Avatar,
  Typography
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AllCategoriesIcon from '@mui/icons-material/ViewList';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import SideNavigationIcons from './SideNavigationIcons';
const DesktopSideNavigation = ({
  drawerWidth,
  deviceType,
  categories,
  pages,
  productsGroupByCategories,
  handleCategoryClick,
  resetCategory,
  priceRange,
  selectedCategoryId
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const toggleCategoriesCollapse = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
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
              <Avatar
                src={getUserProfilePicture()}
                sx={{ width: 70, height: 70 }}
                component={Link}
                to="/profile"></Avatar>
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
                component={Link}
                to={page.link}
                selected={window.location.pathname === page.link}>
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
        <Divider />
        <List>
          {(() => {
            if (categories) {
              const ListItems = categories.map((category, index) => {
                return (
                  <ListItem key={category._id} disablePadding>
                    <ListItemButton
                      className="side-nav-list-item"
                      selected={category._id === selectedCategoryId}
                      onClick={() => handleCategoryClick(category._id)}>
                      <ListItemIcon sx={{ color: 'black' }}>
                        {SideNavigationIcons[category.icon]}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                        primary={category.name}
                        secondary={
                          productsGroupByCategories &&
                          productsGroupByCategories.filter((cat) => cat._id === category._id)[0]
                            .count
                        }
                        primaryTypographyProps={{
                          fontSize: '0.8em',
                          display: 'inline-block'
                        }}
                        secondaryTypographyProps={{
                          display: 'inline-block',
                          fontSize: '0.7em'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              });
              return (
                <>
                  <Filters
                    deviceType={deviceType}
                    selectedCategoryId={selectedCategoryId}
                    priceRange={priceRange}></Filters>

                  <ListItemButton onClick={toggleCategoriesCollapse}>
                    <ListItemIcon sx={{ color: 'black' }}>
                      {SideNavigationIcons.Categories}
                    </ListItemIcon>
                    <ListItemText
                      primary="Categories"
                      primaryTypographyProps={{
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                      }}></ListItemText>
                    {isCategoriesOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={isCategoriesOpen} timeout={'auto'} unmountOnExit>
                    <ListItem disablePadding>
                      <ListItemButton
                        className="side-nav-list-item"
                        selected={!selectedCategoryId}
                        onClick={() => resetCategory()}>
                        <ListItemIcon sx={{ color: 'black' }}>
                          {SideNavigationIcons.AllProducts}
                        </ListItemIcon>
                        <ListItemText
                          primary={'All Products'}
                          primaryTypographyProps={{
                            fontSize: '0.8em'
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {ListItems}
                  </Collapse>
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

export default DesktopSideNavigation;
