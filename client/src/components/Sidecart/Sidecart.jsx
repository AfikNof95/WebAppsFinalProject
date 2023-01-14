import "./Sidecart.css";
import { Button, Drawer, Typography } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

import CartProductList from "../CartProductList/CartProductList";

export function SideCart({ isCartOpen }) {
  const { closeCart, getCartTotalPrice } = useShoppingCart();

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          width: 500,
        },
      }}
    >
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
              id="checkoutButton"
              component={RouterLink}
              to="/checkout"
              type="button"
              variant="outlined"
              fullWidth
              size="large"
            >
              Proceed to checkout
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
