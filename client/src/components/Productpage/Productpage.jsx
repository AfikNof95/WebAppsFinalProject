import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";

const ProductPage = (props) => {
  const { state } = useLocation();
  const { product } = state.product;
  const [index, setIndex] = useState(0);
  const { addToCart, openCart } = useShoppingCart();
  let productName = product.name;
  console.log(productName);

  try {
    productName = product.name.split("|")[0];
    productName = productName.split(/[.]/)[0];
  } catch (error) {}

  const switchIndex = async (pressedIndex) => {
    setIndex(pressedIndex);
  };

  return (
    <div>
    <Box marginRight={100} marginLeft={8} sx={{ width: 5/6 }}>
      <Typography component="h3" variant="h3" marginTop={8} marginBottom={2}> {productName} </Typography>
      <Grid container spacing={1}>
        <Grid item md={10} xs={8}>
          <Card sx={{ width: 3 / 4 }}>
            <List>
              <Box>
                <Box sx={{ width: 1 / 2 }} maxHeight={700} component="img" src={product.images[index]} />
                <ImageList flexWrap="nowrap" transform="translateZ(0)" cols={9}> {product.images.map((item, index) => ( <ImageListItem key={item}>
                    <img size="medium" src={item} key={index} alt="" loading="lazy" onClick={()=> switchIndex(index)} />
                  </ImageListItem> ))} </ImageList>
              </Box>
            </List>
            <Grid marginTop={3}>
              <Typography component="h3" variant="h3"> ${product.price} </Typography>
            </Grid>
            <Button variant="contained" color="inherit" onClick={()=> { addToCart(product); openCart(); }} fullWidth > Add to cart </Button>
          </Card>
        </Grid>
      </Grid>
      <Typography marginRight={10}>{product.description}</Typography>
    </Box>
  </div>
  );
};

export default ProductPage;
