import "./Cart.css";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import CartProductList from "../../components/CartProductList/CartProductList";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatPrice } from "../../utils/formatPrice";

const CartPage = () => {
  const { getCartTotalPrice, getCartQuantity, getCartProducts } =
    useShoppingCart();

  const getCartTitle = () => {
    if (getCartQuantity() > 0) {
      return "You are one step away from completing your order!";
    }
    return "Please add products to your cart.";
  };

  const cartProducts = getCartProducts();

  return (
    <div className="cart-layout">
      <Toolbar></Toolbar>
      <Container>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h5" marginBottom={5}>
            {getCartTitle()}
          </Typography>

          {getCartQuantity() > 0 && (
            <Stack
              direction={"row"}
              gap={2}
              justifyContent={"space-around"}
              flexWrap
            >
              <Stack direction={"column"} gap={3} minWidth={500}>
                <CartProductList></CartProductList>
              </Stack>

              <Paper
                elevation={3}
                sx={{ width: 400, minHeight: 300, padding: 5 }}
              >
                <Box display={"flex"} flexDirection="column" height={"100%"}>
                  <Typography variant="h6">Order summary</Typography>
                  <Divider der></Divider>
                  <Stack direction={"column"} marginBottom={2}>
                    {cartProducts.map((cartProduct) => (
                      <Box
                        key={cartProduct.product._id}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"}>
                          <Typography
                            variant="body1"
                            noWrap
                            overflow={"hidden"}
                            maxWidth={230}
                            textOverflow={"ellipsis"}
                          >
                            {cartProduct.product.name}
                          </Typography>
                          <FormLabel
                            color="secondary"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.7em",
                              alignSelf: "self-end",
                            }}
                          >
                            x{cartProduct.quantity}
                          </FormLabel>
                        </Box>
                        <Typography fontWeight={"bold"}>
                          {formatPrice(
                            cartProduct.quantity * cartProduct.product.price
                          )}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Divider></Divider>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    marginTop={1}
                  >
                    <Typography variant="body1" textAlign={"start"}>
                      Total Price:
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      textAlign={"end"}
                    >
                      {getCartTotalPrice()}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    marginTop="auto"
                  >
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
              </Paper>
            </Stack>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default CartPage;
