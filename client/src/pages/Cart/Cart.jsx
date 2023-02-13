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
import { ShoppingBagOutlined } from '@mui/icons-material';

const CartPage = () => {
  const { getCartTotalPrice, getCartQuantity, getCartProducts, isShoppingCartLoading } =
    useShoppingCart();

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
          <Grid item xs={12} sm={12} md={12} lg={12} padding={1} height={'100%'}>
            <Box
              display={'flex'}
              flexDirection="column"
              component={Paper}
              minHeight={"80%"}
              maxHeight={'95%'}
              width={'50%'}
              margin={'auto'}>
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
              <Box padding={2} maxHeight={'80%'} overflow={'auto'} position={'relative'}>
                {isShoppingCartLoading && (
                  <Box
                    display={'flex'}
                    position={getCartQuantity() == 0 ? 'relative' : 'absolute'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      minHeight: 600,
                      backgroundColor: '#cecece52',
                      zIndex: 9999
                    }}>
                    <CircularProgress style={{ width: '30vh', height: '30vh' }} />
                  </Box>
                )}
                {getCartQuantity() > 0 ? (
                  <Stack direction={'column'} gap={3}>
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
              <Box padding={2} marginTop="auto">
                <Box>
                  <Box display={'flex'} justifyContent="space-between" marginTop={1}>
                    <Typography variant="body1" textAlign={'start'}>
                      Total Price:
                    </Typography>
                    <Typography variant="body1" fontWeight={'bold'} textAlign={'end'}>
                      {getCartTotalPrice()}
                    </Typography>
                  </Box>
                </Box>
                <Box display={'flex'} justifyContent="center">
                  <Button
                    fullWidth
                    disabled={getCartQuantity() === 0}
                    variant="contained"
                    color="secondaryButton"
                    size="large"
                    LinkComponent={ReactLink}
                    to="/checkout">
                    Checkout now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
