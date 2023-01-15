import "./Sidecart.css";
import {
  Button,
  Drawer,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

import CartProductList from "../CartProductList/CartProductList";

export function SideCart({ isCartOpen }) {
  const { closeCart, getCartTotalPrice } = useShoppingCart();

  const myTheme = createTheme({
    palette: {
      infoLight: {
        main: "#959595",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={closeCart}
        PaperProps={{
          sx: {
            width: 400,
          },
        }}
      >
        <Box display={"flex"} justifyContent="flex-end" marginBottom={2}>
          <Tooltip title="Close cart">
            <IconButton onClick={closeCart}>
              <ClearIcon></ClearIcon>
            </IconButton>
          </Tooltip>
        </Box>
        <Divider></Divider>
        <Box sx={{ padding: "15px" }}>
          <Stack spacing={3} direction={"column"}>
            <Stack spacing={2}>
              <CartProductList />
            </Stack>

            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Typography fontWeight={"bold"} textAlign={"end"}>
                Total Price: {getCartTotalPrice()}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
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
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Button
                component={RouterLink}
                to="/cart"
                onClick={closeCart}
                type="button"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 5, color: "white" }}
                size="large"
                color="infoLight"
              >
                Your cart
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
