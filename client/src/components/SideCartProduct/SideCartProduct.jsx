import "./SideCartProduct.css";
import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Box } from "@mui/system";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

export function SideCartProduct({ id, name, imageURL, quantity, price }) {
  const { removeFromCart, increaseProductQuantity, decreaseProductQuantity } =
    useShoppingCart();

  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0 }}>
        <Tooltip title="Remove product">
          <IconButton color="error" onClick={() => removeFromCart(id)}>
            <ClearIcon></ClearIcon>
          </IconButton>
        </Tooltip>
      </div>
      <Stack direction={"row"} gap={1} display="flex" padding={1}>
        <img
          src={imageURL}
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        ></img>

        <Stack direction={"column"} gap={1} display="flex">
          <Box
            display={"flex"}
            flexDirection="column"
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            marginTop={1}
          >
            <Typography
              component={Link}
              to={`/product/${id}`}
              display={"block"}
              color="text.black"
              fontWeight={"bold"}
              maxWidth={150}
              textOverflow={"ellipsis"}
              noWrap
              sx={{ textDecoration: "none", color: "black" }}
            >
              {name}
            </Typography>
            <Typography color="text.secondary" fontSize={"0.8rem"}>
              {formatPrice(price)}
            </Typography>
          </Box>
          <div>
            <TextField
              variant="outlined"
              type="number"
              name="quantity-input"
              key="quantity"
              InputProps={{
                startAdornment: (
                  <IconButton
                    onClick={() => decreaseProductQuantity(id)}
                    size="small"
                  >
                    <MinusIcon fontSize="0.6em"></MinusIcon>
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => increaseProductQuantity(id)}
                    size="small"
                  >
                    <PlusIcon fontSize="0.6em"></PlusIcon>
                  </IconButton>
                ),
              }}
              sx={{ width: "120px", alignSelf: "flex-end" }}
              inputProps={{ style: { textAlign: "center" } }}
              value={quantity}
              disabled
              size="small"
            ></TextField>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}
