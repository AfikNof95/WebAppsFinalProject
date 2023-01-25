import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { Grid, Box, Button } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import omit from "lodash/omit";

export default function Review(props) {
  const { handleNext, handleBack } = props;
  const { paymentInfo, userInfo, getCartProducts, getCartTotalPrice } =
    useShoppingCart();

  const products = getCartProducts();
  const sumOrder = getCartTotalPrice();

  const last4digits = paymentInfo?.cardNumber.substr(-4);
  const payments = [
    { name: "Card holder", detail: paymentInfo.cardName },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${last4digits}` },
  ];

  const PPPproducts = [
    {
      name: "Product 1",
      desc: "A nice thing",
      price: "$9.99",
    },
    {
      name: "Product 3",
      desc: "Something else",
      price: "$6.51",
    },
    { name: "Shipping", desc: "", price: "Free" },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <hr />
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.product.name} sx={{ py: 1, px: 0 }}>
            {/* Sholud be desc of product as well */}
            <ListItemText
              primary={product.product.name}
              secondary={product.desc}
            />
            <Typography variant="body2">${product.product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {sumOrder}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {Object.values(
              omit(userInfo, [
                "address1",
                "address2",
                "city",
                "state",
                "zip",
                "country",
              ])
            )
              .filter(Boolean)
              .join(" ")}
          </Typography>
          <Typography gutterBottom>
            {Object.values(omit(userInfo, ["fName", "lName"]))
              .filter(Boolean)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          Place order
        </Button>
      </Box>
    </React.Fragment>
  );
}
