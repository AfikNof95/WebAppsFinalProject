import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MoreIcon from '@mui/icons-material/MoreVert';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useAuth } from '../../context/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '400px'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch'
    }
  }
}));

function Navbar() {
  const { isUserSignedIn, signOut, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = React.useState('');
  const { openCart, getCartQuantity } = useShoppingCart();
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const searchInput = useRef();

  useEffect(() => {
    const searchTermParam = searchParams.get('searchTerm');
    setSearchInputValue(searchTermParam || '');
  }, [searchParams]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignInClick = () => {
    setAnchorEl(null);
    navigate('/login');
  };

  const handleSignOutClick = () => {
    setAnchorEl(null);
    signOut();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNavBarSearch = (event) => {
    if (event.keyCode === 13) {
      if (event.target.value !== searchParams.get('searchTerm'))
        navigate(`/?searchTerm=${event.target.value}`);
    }
  };

  const handleSearchInput = (event) => {
    setSearchInputValue(searchInput.current.value);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      {isUserSignedIn() && [
        <MenuItem key="Account" component={RouterLink} to={'/account'} onClick={handleMenuClose}>
          <IconButton size="large" color="inherit">
            <AccountCircle></AccountCircle>
          </IconButton>
          Account
        </MenuItem>
      ]}
      {isAdmin() && (
        <MenuItem
          key="Dashboard"
          component={RouterLink}
          to={'/dashboard'}
          onClick={handleMenuClose}>
          <IconButton size="large" color="inherit">
            <DashboardIcon></DashboardIcon>
          </IconButton>
          Dashboard
        </MenuItem>
      )}

      <MenuItem component={RouterLink} to={'/'} onClick={handleSignOutClick}>
        <IconButton size="large" color="inherit">
          <LogoutIcon></LogoutIcon>
        </IconButton>
        Sign out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <MenuItem component={RouterLink} to="/cart" key="CartMobile">
        <IconButton size="large" color="inherit">
          <Badge badgeContent={getCartQuantity()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isUserSignedIn() && (
        <MenuItem component={RouterLink} to="/account" key="AccountMobile">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      )}
      {isAdmin() && (
        <MenuItem component={RouterLink} to="/dashboard" key="DashboardMobile">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      )}

      <MenuItem
        key="SignOutMobile"
        onClick={isUserSignedIn() ? handleSignOutClick : handleSignInClick}>
        <IconButton size="large" color="inherit">
          {isUserSignedIn() ? <LogoutIcon></LogoutIcon> : <LoginIcon />}
        </IconButton>
        <p>{isUserSignedIn() ? 'Sign Out' : 'Sign In'}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={3}
        position="fixed"
        sx={{
          height: 64,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'var(--main-app-blue)',
          color: 'white'
        }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={'div'}
            sx={{ display: { sm: 'block' }, mr: 2 }}
            size="large"
            edge="start"
            color="inherit">
            <Button component={RouterLink} to={'/'} style={{ color: '#ffffff' }}>
              Store.io
            </Button>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={searchInput}
              placeholder="Search Products..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchInputValue}
              onKeyDown={handleNavBarSearch}
              onInput={handleSearchInput}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => getCartQuantity() > 0 && openCart()}>
              <Badge badgeContent={getCartQuantity()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isUserSignedIn() ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Button component={RouterLink} to={'/login'} color="inherit">
                Sign In
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Navbar;
