import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import omit from "lodash/omit";
import CheckoutContext from "../../context/checkoutContext";

export default function Review(props) {
  const checkoutCtx = useContext(CheckoutContext);
  const { handleNext, handleBack } = props;

  const sumOrder = "$34.06"; // temp of course

  const last4digits = checkoutCtx?.paymentInfo?.cardNumber.substr(-4);
  const payments = [
    { name: "Card holder", detail: checkoutCtx.paymentInfo.cardName },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${last4digits}` },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <hr />
      <List disablePadding>
        {checkoutCtx.tmpProducts.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
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
              omit(checkoutCtx.userInfo, [
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
            {Object.values(omit(checkoutCtx.userInfo, ["fName", "lName"]))
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
