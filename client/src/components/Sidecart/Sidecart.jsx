import './Sidecart.css'
import {
    Button,
    Drawer,
    Typography,
    createTheme,
    ThemeProvider,
    IconButton,
    Tooltip,
    Divider,
    Toolbar,
    CircularProgress,
} from '@mui/material'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'

import CartProductList from '../SideCartProductList/SideCartProductList'

export function SideCart({ isCartOpen }) {
    const { closeCart, getCartTotalPrice, isShoppingCartLoading } =
        useShoppingCart()

    const myTheme = createTheme({
        palette: {
            infoLight: {
                main: '#959595',
            },
        },
    })

    return (
        <ThemeProvider theme={myTheme}>
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={closeCart}
                PaperProps={{
                    sx: {
                        width: 450,
                    },
                }}
            >
                <Toolbar />
                {isShoppingCartLoading ? (
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{ width: '100%', height: '100vh' }}
                    >
                        <CircularProgress
                            style={{ width: '50%', height: 'auto' }}
                        />
                    </Box>
                ) : (
                    <Box sx={{ padding: '15px' }}>
                        <Stack spacing={3} direction={'column'}>
                            <Stack
                                spacing={2}
                                maxHeight={450}
                                overflow={'auto'}
                            >
                                <CartProductList />
                            </Stack>

                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                                alignItems={'flex-end'}
                            >
                                <Typography
                                    fontWeight={'bold'}
                                    textAlign={'end'}
                                >
                                    Total Price: {getCartTotalPrice()}
                                </Typography>
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                                alignItems={'flex-end'}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/checkout"
                                    onClick={closeCart}
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ borderRadius: 5 }}
                                    color="info"
                                >
                                    Proceed to checkout
                                </Button>
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                                alignItems={'flex-end'}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/cart"
                                    onClick={closeCart}
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    sx={{ borderRadius: 5, color: 'white' }}
                                    size="large"
                                    color="infoLight"
                                >
                                    Your cart
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Drawer>
        </ThemeProvider>
    )
}
