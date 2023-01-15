import "./Cart.css";
import { Link as ReactLink } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import CartProductList from "../../components/CartProductList/CartProductList";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const CartPage = () => {
  const { getCartTotalPrice, getCartQuantity } = useShoppingCart();

  const getCartTitle = () => {
    if (getCartQuantity() > 0) {
      return "You are one step away from completing your order!";
    }
    return "Please add products to your cart.";
  };
  return (
    <div className="cart-layout">
      <Container>
        <Paper elevation={1} sx={{ minHeight: "700px" }}>
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
              padding: "10px",
            }}
            display={"flex"}
            justifyContent="center"
            alignContent={"center"}
          >
            <Typography variant="h4" color="white">
              {getCartTitle()}
            </Typography>
          </Box>

          <Divider></Divider>
          <Stack direction={"column"} spacing={1} padding="10px">
            <Box height={600} overflow="auto">
              <CartProductList></CartProductList>
            </Box>
            <Box
              display={"flex"}
              justifyContent="flex-end"
              justifySelf={"flex-end"}
            >
              <Typography fontWeight={"bold"} textAlign={"end"}>
                Total Price: {getCartTotalPrice()}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent="center">
              <Button
                disabled={getCartQuantity() === 0}
                variant="contained"
                size="large"
                LinkComponent={ReactLink}
                to="/checkout"
              >
                Proceed to checkout
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default CartPage;
