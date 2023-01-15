import "./CartProduct.css";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Box } from "@mui/system";
import { formatPrice } from "../../utils/formatPrice";

export function CartProduct({ id, name, imageURL, quantity, price }) {
  const { removeFromCart, increaseProductQuantity, decreaseProductQuantity } =
    useShoppingCart();

  return (
    <Card sx={{ display: "flex", padding: 2 }} elevation={1}>
      <Avatar sx={{ width: 80, height: 80 }} src={imageURL} />
      <CardContent
        sx={{
          flex: "1 0 auto",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems={"center"}
          height={"100%"}
        >
          <Grid item xs={3}>
            <Typography component="div" variant="body1" fontWeight={"bold"}>
              {name}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              type="number"
              name="quantity-input"
              key="quantity"
              color="primary"
              InputProps={{
                startAdornment: (
                  <IconButton
                    sx={{ pointerEvents: "all" }}
                    onClick={() => decreaseProductQuantity(id)}
                    size="small"
                  >
                    <MinusIcon fontSize="0.6em"></MinusIcon>
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    sx={{ pointerEvents: "all" }}
                    onClick={() => increaseProductQuantity(id)}
                    size="small"
                  >
                    <PlusIcon fontSize="0.6em"></PlusIcon>
                  </IconButton>
                ),
              }}
              sx={{ width: "120px", pointerEvents: "none" }}
              inputProps={{ style: { textAlign: "center" } }}
              value={quantity}
              size="small"
            ></TextField>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="body1">{formatPrice(price)}</Typography>
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="end">
            <IconButton onClick={() => removeFromCart(id)}>
              <ClearIcon></ClearIcon>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
