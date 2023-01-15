import "./Cart.css";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Paper,
  Stack,
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
      <Container>
        <Typography variant="h5" marginBottom={5}>
          {getCartTitle()}
        </Typography>

        {getCartQuantity() > 0 && (
          <Stack direction={"row"} gap={2} flexWrap>
            <Stack direction={"column"} gap={3} minWidth={500}>
              <CartProductList></CartProductList>
            </Stack>

            <Paper elevation={3} sx={{ width: 300, padding: 5 }}>
              <Box display={"flex"} flexDirection="column" height={"100%"}>
                <Typography variant="h6">Order summary</Typography>
                <Divider></Divider>
                <Stack direction={"column"} marginBottom={2}>
                  {cartProducts.map((cartProduct) => (
                    <Box
                      key={cartProduct.product._id}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <div>
                        <Typography variant="body1">
                          {cartProduct.product.name}
                          <FormLabel
                            color="secondary"
                            sx={{ fontWeight: "bold", fontSize: "0.7em" }}
                          >
                            x{cartProduct.quantity}
                          </FormLabel>
                        </Typography>
                      </div>
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
                <Box display={"flex"} justifyContent="center" marginTop="auto">
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
      </Container>
    </div>
  );
};

export default CartPage;
