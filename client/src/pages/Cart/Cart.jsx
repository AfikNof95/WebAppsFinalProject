import './Cart.css';
import { Link as ReactLink } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import CartProductList from '../../components/CartProductList/CartProductList';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatPrice } from '../../utils/formatPrice';
import ShoppingBag from '@mui/icons-material/ShoppingBagOutlined';
import { Container } from '@mui/system';
import { ReceiptLong, ShoppingBagOutlined } from '@mui/icons-material';

const CartPage = () => {
  const {
    getCartTotalPrice,
    getCartQuantity,
    getCartTotalPriceNumber,
    getCartProducts,
    isShoppingCartLoading
  } = useShoppingCart();

  const getCartTitle = () => {
    const title = getCartQuantity() > 0 ? 'My Cart' : 'Your Cart Is Empty!';
    return (
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={3}>
        <ShoppingBag fontSize="large"></ShoppingBag>
        <Typography variant="h4" fontWeight={'bold'}>
          {title}
        </Typography>
      </Box>
    );
  };
  return (
    <>
      <Toolbar></Toolbar>
      <Container maxWidth="xl">
        <Grid container height={'calc(100vh - 64px)'}>
          <Grid item xs={12} sm={12} md={12} lg={6} padding={1} height={{sm:"auto",md:"'100%'"}}>
            <Box display={'flex'} flexDirection="column" component={Paper} height={'100%'}>
              <Box
                display={'flex'}
                width="100%"
                padding={2}
                sx={{ backgroundColor: (theme) => theme.palette.mainButton.main }}
                justifyContent={'center'}>
                <ShoppingBag fontSize="large" sx={{ color: 'white' }}></ShoppingBag>
                <Typography variant="h4" fontWeight={'bold'} color={'white'} textAlign={'center'}>
                  My Cart
                </Typography>
              </Box>
              <Box  height={'100%'} overflow={'auto'} position={'relative'}>
                {isShoppingCartLoading && (
                  <Box
                    display={'flex'}
                    position={getCartQuantity() == 0 ? 'relative' : 'absolute'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#cecece52',
                      zIndex: 9999
                    }}>
                    <CircularProgress style={{ width: '20vh', height: '20vh' }} />
                  </Box>
                )}
                {getCartQuantity() > 0 ? (
                  <Stack direction={'column'} gap={3} padding={2}>
                    <CartProductList></CartProductList>
                  </Stack>
                ) : (
                  !isShoppingCartLoading && (
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      height={300}
                      width={'100%'}>
                      <Typography variant="body1" fontWeight={'bold'} fontSize={'1.5em'}>
                        Your Cart is Empty!
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} padding={1}>
            <Box display={'flex'} flexDirection="column" component={Paper} height={'100%'}>
              <Box
                display={'flex'}
                width="100%"
                padding={2}
                sx={{ backgroundColor: (theme) => theme.palette.mainButton.main }}
                justifyContent={'center'}>
                <ReceiptLong fontSize="large" sx={{ color: 'white' }}></ReceiptLong>
                <Typography variant="h4" fontWeight={'bold'} color={'white'} textAlign={'center'}>
                  Order Summary
                </Typography>
              </Box>

              <Grid item xs={12} padding={2}>
                <Stack direction={'column'} marginBottom={2} marginTop={2} gap={2}>
                  {getCartProducts().map((cartProduct) => (
                    <Box
                      key={cartProduct.product._id}
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'space-between'}>
                      <Box display={'flex'} width={'80%'}>
                        <Typography
                          fontWeight={'bold'}
                          fontSize={'1em'}
                          noWrap
                          overflow={'hidden'}
                          textOverflow={'ellipsis'}>
                          {cartProduct.product.name}
                        </Typography>
                        <FormLabel
                          color="secondary"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '0.7em',
                            alignSelf: 'self-end'
                          }}>
                          x{cartProduct.quantity}
                        </FormLabel>
                      </Box>
                      <Typography fontWeight={'bold'}>
                        {formatPrice(cartProduct.quantity * cartProduct.product.price)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
              <Grid container marginTop="auto"  padding={2}>
                <Grid item xs={12}>
                  <Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Typography variant="body1" textAlign={'start'} fontSize={'1.3em'}>
                        Price Before Taxes:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={'bold'}
                        textAlign={'end'}
                        fontSize={'1.3em'}>
                        {formatPrice(
                          getCartTotalPriceNumber() -
                            (getCartTotalPriceNumber() - (getCartTotalPriceNumber() / 0.18) * 0.17)
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Typography variant="body1" textAlign={'start'} fontSize={'1.3em'}>
                        VAT:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={'bold'}
                        textAlign={'end'}
                        fontSize={'1.3em'}>
                        17%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Typography
                        variant="body1"
                        textAlign={'start'}
                        fontWeight={'bold'}
                        fontSize={'1.3em'}>
                        Total Price:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={'bold'}
                        textAlign={'end'}
                        fontSize={'1.3em'}>
                        {getCartTotalPrice()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} marginTop={3}>
                  <Box width="100%">
                    <Button
                      fullWidth
                      disabled={getCartQuantity() === 0}
                      variant="contained"
                      color="secondaryButton"
                      size="large"
                      sx={{height:"70px"}}
                      LinkComponent={ReactLink}
                      to="/checkout">
                      Checkout now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
