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
import { AnimateOnChange } from 'react-animation';

const ProductPage = (props) => {
  const shortStock = [
    'Low On Stock!   Only ',
    'About to run out!   Only '
  ]

  const mediumStock = [
    'Not much left  ',
    'Great product  ',
    'Great Availabilty  '
  ]

  const largeStock = [
    'Take you time  ',
    'You are lucky! :)  ',
    'High Availability  '
  ]

  const { state } = useLocation();
  const product = state;
  const [index, setIndex] = useState(0);
  const [stockCount, setStockCount] = useState(product.quantity)
  const [current, setCurrent] = useState(0)
  const { addToCart, openCart } = useShoppingCart();
  const firstMassage = ['Available in stock ']
  const [massageType, setMassageType] = useState(firstMassage)
  let productName = product.name;

  try {
    productName = product.name.split("|")[0];
    productName = productName.split(/[.]/)[0];
  } catch (error) {}

  const switchIndex = async (pressedIndex) => {
    setIndex(pressedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStockCount(product.quantity)
      let message = mediumStock

      if(!stockCount) 
        message=['Out of stock ']
      else if(stockCount < 10) 
        message = shortStock
      else if(stockCount > 30)
        message = largeStock
      

      setMassageType(message)
      if (current === message.length - 1) {
        setCurrent(0)
      } else {
        setCurrent(current + 1)
      }
    }, 5000);
    return (() => {
      clearInterval(interval)
    })
  })
  return (
    <div>
      <Box marginLeft={8} sx={{ width: 80/85 }}>
        <Typography component="h3" variant="h3" marginTop={8} marginBottom={2}> {productName} </Typography>
        <Grid container spacing={1}>
          <Card sx={{ width: 2/3 }}>
            <List>
              <Box>
                <Box sx={{ width: 1 / 2 }} maxHeight={700} component="img" src={product.images[index]} />
                <ImageList flexWrap="nowrap" transform="translateZ(0)" cols={9}> {product.images.map((item, index) => ( <ImageListItem key={item}>
                    <img size="medium" src={item} key={index} alt="" loading="lazy" onClick={()=> switchIndex(index)} />
                  </ImageListItem> ))} </ImageList>
              </Box>
            </List>
          </Card>
          <Grid marginTop={3} marginLeft={7} textAlign={"center"}>
            <Typography marginBottom={10} component="h3" variant="h3"> ${product.price} </Typography>
            <Button marginBottom={10} marginTop={5} variant="contained" color="inherit" onClick={()=> { addToCart(product); openCart(); }} fullWidth > Add to cart </Button>
            <AnimateOnChange className="foo" animationOut="bounceOut" animationIn="bounceIn" durationOut="1000" durationIn="1000">
              <h4> {massageType[current]} {stockCount} Left in stock </h4>
            </AnimateOnChange>
          </Grid>
        </Grid>
        <Typography marginRight={10}>{product.description}</Typography>
      </Box>
  </div>
  );
};

export default ProductPage;