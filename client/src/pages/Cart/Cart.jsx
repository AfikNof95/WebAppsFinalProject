import './Cart.css'
import { Link as ReactLink } from 'react-router-dom'
import {
    Box,
    Button,
    Divider,
    Drawer,
    FormLabel,
    Grid,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import CartProductList from '../../components/CartProductList/CartProductList'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { formatPrice } from '../../utils/formatPrice'
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined'

const CartPage = () => {
    const { getCartTotalPrice, getCartQuantity, getCartProducts } =
        useShoppingCart()

    const getCartTitle = () => {
        if (getCartQuantity() > 0) {
            return (
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginBottom={3}
                >
                    <ShoppingBag fontSize="large"></ShoppingBag>
                    <Typography variant="h4" fontWeight={'bold'}>
                        My Cart
                    </Typography>
                </Box>
            )
        }
        return (
            <Typography
                variant="h4"
                marginBottom={5}
                textAlign={'center'}
                fontWeight={'bold'}
            >
                Your cart is empty!
            </Typography>
        )
    }

    const cartProducts = getCartProducts()
    const drawerWidth = 600

    return (
        <>
            {/* height={'calc(100vh - 64px)'} */}
            <Grid
                container
                height={'calc(100vh - 64px)'}
                overflow={'auto'}
                marginTop={'64px'}
            >
                <Grid item xs={12} sm={12} md={8} padding={1}>
                    <Paper>
                        {getCartTitle()}
                        <Divider></Divider>
                        {getCartQuantity() > 0 && (
                            <Stack direction={'column'} gap={3}>
                                <CartProductList></CartProductList>
                            </Stack>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Box
                        display={'flex'}
                        flexDirection="column"
                        component={Paper}
                    >
                        <Box padding={2}>
                            <Typography
                                variant="h4"
                                fontWeight={'bold'}
                                marginBottom={3}
                            >
                                Order summary
                            </Typography>
                            <Divider></Divider>
                            <Stack
                                direction={'column'}
                                marginBottom={2}
                                marginTop={2}
                                gap={2}
                            >
                                {cartProducts.map((cartProduct) => (
                                    <Box
                                        key={cartProduct.product._id}
                                        display={'flex'}
                                        flexDirection={'row'}
                                        justifyContent={'space-between'}
                                    >
                                        <Box display={'flex'}>
                                            <Typography
                                                variant="body1"
                                                noWrap
                                                overflow={'hidden'}
                                                maxWidth={300}
                                                textOverflow={'ellipsis'}
                                            >
                                                {cartProduct.product.name}
                                            </Typography>
                                            <FormLabel
                                                color="secondary"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7em',
                                                    alignSelf: 'self-end',
                                                }}
                                            >
                                                x{cartProduct.quantity}
                                            </FormLabel>
                                        </Box>
                                        <Typography fontWeight={'bold'}>
                                            {formatPrice(
                                                cartProduct.quantity *
                                                    cartProduct.product.price
                                            )}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                            <Divider></Divider>
                            <Box
                                display={'flex'}
                                justifyContent="space-between"
                                marginTop={1}
                            >
                                <Typography variant="body1" textAlign={'start'}>
                                    Total Price:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight={'bold'}
                                    textAlign={'end'}
                                >
                                    {getCartTotalPrice()}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display={'flex'} justifyContent="center">
                            <Button
                                fullWidth
                                disabled={getCartQuantity() === 0}
                                variant="contained"
                                size="large"
                                LinkComponent={ReactLink}
                                to="/checkout"
                            >
                                Checkout now
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CartPage
