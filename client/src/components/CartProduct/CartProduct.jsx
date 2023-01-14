import "./CartProduct.css";
import { IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Box } from "@mui/system";

export function CartProduct({ id, name, imageURL, quantity, price }) {
  const {
    removeFromCart,
    updateProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useShoppingCart();

  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0 }}>
        <IconButton color="error" onClick={() => removeFromCart(id)}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </div>
      <Stack direction={"row"} gap={1} display="flex" padding={1}>
        <img
          src={imageURL}
          style={{ width: "125px", height: "125px", objectFit: "contain" }}
        ></img>

        <Stack direction={"column"} gap={1} display="flex">
          <Box
            display={"flex"}
            flexDirection="row"
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            marginTop={1}
          >
            <Typography
              color="text.black"
              fontWeight={"bold"}
              flexBasis={"100%"}
            >
              {name}
            </Typography>
            <Typography color="text.secondary" fontSize={"0.8rem"}>
              {price}$
            </Typography>
          </Box>
          <div style={{ alignSelf: "flex-end" }}>
            <TextField
              variant="outlined"
              type="number"
              name="quantity-input"
              key="quantity"
              InputProps={{
                startAdornment: (
                  <IconButton onClick={() => decreaseProductQuantity(id)}>
                    <MinusIcon></MinusIcon>
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton onClick={() => increaseProductQuantity(id)}>
                    <PlusIcon></PlusIcon>
                  </IconButton>
                ),
              }}
              sx={{ width: "150px", alignSelf: "flex-end" }}
              inputProps={{ style: { textAlign: "center" } }}
              value={quantity}
              onInput={(event) =>
                updateProductQuantity(id, Number(event.target.value))
              }
            ></TextField>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}
