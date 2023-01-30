import React, { useEffect } from 'react'
import './Navbar.css'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material'
import { InputBase, Badge, MenuItem, Menu, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MoreIcon from '@mui/icons-material/MoreVert'
import LoginIcon from '@mui/icons-material/Login'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { useAuth } from '../../context/AuthContext'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '400px',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}))

function Navbar() {
    const { isUserSignedIn, signOut } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInputValue, setSearchInputValue] = React.useState(() => {
        return searchParams.get('freeText') || ''
    })
    const { openCart, getCartQuantity } = useShoppingCart()

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleSignOutClick = () => {
        setAnchorEl(null)
        signOut()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleNavBarSearch = (event) => {
        if (event.keyCode === 13) {
            let key = searchParams.keys().next()
            while (key.done === false) {
                searchParams.delete(key.value)
                key = searchParams.keys().next()
            }

            searchParams.set('freeText', event.currentTarget.value)
            setSearchParams(searchParams)
        }
    }

    useEffect(() => {
        if (searchParams.get('freeText')) {
            setSearchInputValue(searchParams.get('freeText'))
        }
    }, [searchParams])

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <RouterLink to="/account">
                <MenuItem onClick={handleMenuClose}>Account</MenuItem>
            </RouterLink>
            <RouterLink to={`/profile`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </RouterLink>
            <RouterLink to={`/`}>
                <MenuItem onClick={handleSignOutClick}>Sign out</MenuItem>
            </RouterLink>
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="Login" color="inherit">
                    <LoginIcon />
                </IconButton>
                <p>Login</p>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                elevation={3}
                position="fixed"
                sx={{
                    // backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%);",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '#24344c',
                    color: 'white',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={'div'}
                        sx={{ display: { sm: 'block' }, mr: 2 }}
                        size="large"
                        edge="start"
                        color="inherit"
                    >
                        <Button
                            component={RouterLink}
                            to={'/'}
                            style={{ color: '#ffffff' }}
                        >
                            Store
                        </Button>
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Products..."
                            inputProps={{ 'aria-label': 'search' }}
                            defaultValue={searchInputValue}
                            onKeyDown={handleNavBarSearch}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {isUserSignedIn() ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={() =>
                                        getCartQuantity() > 0 && openCart()
                                    }
                                >
                                    <Badge
                                        badgeContent={getCartQuantity()}
                                        color="error"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {(() => {
                                    if (!isUserSignedIn()) {
                                        return (
                                            <>
                                                <Button
                                                    component={RouterLink}
                                                    to={'/login'}
                                                    color="inherit"
                                                >
                                                    Log In
                                                </Button>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <Button
                                                component={RouterLink}
                                                to="/profile"
                                                color="inherit"
                                            >
                                                My Profile
                                            </Button>
                                        )
                                    }
                                })()}
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
}

export default Navbar
