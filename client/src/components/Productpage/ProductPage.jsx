import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import {
  Box,
  Button,
  Grid,
  List,
  Typography,
  ListItem,
  ListItemText,
  Toolbar,
  Paper,
  Divider
} from '@mui/material';
import { AnimateOnChange } from 'react-animation';
import backendAPI from '../../api';
import { Stack } from '@mui/system';
import { formatPrice } from '../../utils/formatPrice';

const ProductPage = (props) => {
  const shortStock = ['Low On Stock!   Only ', 'About to run out!   Only '];

  const mediumStock = ['Not much left  ', 'Great product  ', 'Great Availabilty  '];

  const largeStock = ['Take you time  ', 'You are lucky! :)  ', 'High Availability  '];

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const { addToCart, openCart } = useShoppingCart();
  const firstMassage = ['Available in stock '];
  const [massageType, setMassageType] = useState(firstMassage);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await backendAPI.product.get(productId);
      setProduct(response.data);
      setStockCount(response.data.quantity);
      setIsLoading(false);
    };
    fetchProduct();
  }, []);

  const switchIndex = async (pressedIndex) => {
    setIndex(pressedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStockCount(product.quantity);
      let message = mediumStock;

      if (!stockCount) message = ['Out of stock '];
      else if (stockCount < 10) message = shortStock;
      else if (stockCount > 30) message = largeStock;

      setMassageType(message);
      if (current === message.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    !isLoading && (
      <Box
        component={Paper}
        sx={{ backgroundColor: 'white' }}
        padding={5}
        height={'100vh'}
        overflow={'auto'}>
        <Toolbar></Toolbar>
        <Grid container gap={3}>
          <Grid item xs={12} sm={12} md={5}>
            <Grid container>
              <Grid item xs={2}>
                <Stack gap={2}>
                  {product.images.map((item, index) => (
                    <img
                      key={item}
                      width={80}
                      height={70}
                      src={item}
                      alt=""
                      style={{ objectFit: 'contain' }}
                      loading="lazy"
                      onClick={() => switchIndex(index)}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={9} sm={10}>
                <img
                  width={'100%'}
                  height={'100%'}
                  style={{ objectFit: 'contain' }}
                  component="img"
                  src={product.images[index]}
                  alt=""
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body1" fontWeight={'bold'} padding={2}>
              {product.name}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" padding={2}>
              {formatPrice(product.price)}
            </Typography>
            <Divider></Divider>
            <List sx={{ listStyleType: 'disc', padding: 2 }}>
              {product.description.split('\n').map((desc) => (
                <ListItem key={desc} disablePadding sx={{ display: 'list-item' }}>
                  <ListItemText
                    primaryTypographyProps={{
                      fontWeight: 'bold',
                      fontSize: '0.8em'
                    }}
                    primary={desc}></ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={2} textAlign={'center'}>
            <AnimateOnChange
              className="foo"
              animationOut="bounceOut"
              animationIn="bounceIn"
              durationOut="1000"
              durationIn="1000">
              <h4>
                {' '}
                {massageType[current]} {stockCount} Left in stock{' '}
              </h4>
            </AnimateOnChange>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addToCart(product);
                openCart();
              }}
              fullWidth>
              Add to cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default ProductPage;
