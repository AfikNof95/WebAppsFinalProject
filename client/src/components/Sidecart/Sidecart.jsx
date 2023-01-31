import './Sidecart.css';
import {
  Button,
  Drawer,
  Typography,
  createTheme,
  ThemeProvider,
  Toolbar,
  CircularProgress
} from '@mui/material';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

import CartProductList from '../SideCartProductList/SideCartProductList';

export function SideCart({ isCartOpen }) {
  const { closeCart, getCartTotalPrice, isShoppingCartLoading } = useShoppingCart();

  const myTheme = createTheme({
    palette: {
      infoLight: {
        main: '#959595'
      }
    }
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={closeCart}
        PaperProps={{
          sx: {
            width: 450
          }
        }}>
        <Toolbar />

        <Box sx={{ padding: '15px' }}>
          <Stack spacing={3} direction={'column'}>
            <Stack spacing={2} maxHeight={450} overflow={'auto'} position={'relative'}>
              <Box
                position={'absolute'}
                top={0}
                left={0}
                display={!isShoppingCartLoading ? 'none' : 'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 999
                }}>
                <CircularProgress size={100} sx={{ width: '100%', height: '100%' }} />
              </Box>

              <CartProductList />
            </Stack>

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Typography fontWeight={'bold'} textAlign={'end'}>
                Total Price: {getCartTotalPrice()}
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Button
                component={RouterLink}
                to="/checkout"
                onClick={closeCart}
                type="button"
                variant="contained"
                fullWidth
                size="large"
                sx={{ borderRadius: 5 }}
                color="info">
                Proceed to checkout
              </Button>
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Button
                component={RouterLink}
                to="/cart"
                onClick={closeCart}
                type="button"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 5, color: 'white' }}
                size="large"
                color="infoLight">
                Your cart
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
