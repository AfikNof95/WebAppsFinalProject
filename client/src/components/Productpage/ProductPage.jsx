import './Productpage.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  Typography,
  ImageList,
  ImageListItem,
  ListItem,
  ListItemText,
  Toolbar,
  Paper,
  Divider
} from '@mui/material';
import { AnimateOnChange } from 'react-animation';
import backendAPI from '../../api';
import { Container, Stack } from '@mui/system';
import { formatPrice } from '../../utils/formatPrice';
import { ShoppingBagOutlined } from '@mui/icons-material';

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
      <Box height="100vh">
        <Toolbar></Toolbar>
        <Box
        height={"calc(100vh - 64px)"}
          // component={Paper}
          sx={{ backgroundColor: 'white' }}>
          <Grid container gap={3} padding={5}>
            <Grid item xs={12} sm={12} md={12}>
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
                <Grid item xs={9} sm={10} md={5} xl={3}>
                  <img
                    width={'100%'}
                    height={'100%'}
                    style={{ objectFit: 'contain',maxHeight:"500px",maxWidth:"500px" }}
                    component="img"
                    src={product.images[index]}
                    alt=""
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={5} display={'flex'} alignItems={'center'}>
                  <Box>
                    <Typography variant="body1" fontWeight={'bold'} padding={2} flexBasis={'100%'}>
                      {product.name}
                    </Typography>
                    <Box textAlign={'center'} flexBasis={'100%'}>
                      <Box
                        display="flex"
                        width={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Button
                          variant="contained"
                          startIcon={<ShoppingBagOutlined></ShoppingBagOutlined>}
                          color="secondaryButton.light"
                          onClick={() => {
                            addToCart(product);
                            openCart();
                          }}>
                          Add to cart
                        </Button>
                        <Typography variant="h6" padding={2}>
                          {formatPrice(product.price)}
                        </Typography>
                      </Box>
                      <AnimateOnChange
                        className={'quantity-alert'}
                        animationOut="bounceOut"
                        animationIn="bounceIn"
                        durationOut="1000"
                        durationIn="1000">
                        <h4>
                          {' '}
                          {massageType[current]} {stockCount} Left in stock{' '}
                        </h4>
                      </AnimateOnChange>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
            <List sx={{ listStyleType: 'disc', padding: 2 }}>
            {product.description.split('\n').map((desc) => (
              <ListItem key={desc} disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primaryTypographyProps={{
                    variant:"body1",
                    fontSize: '1em'
                  }}
                  primary={desc}></ListItemText>
              </ListItem>
            ))}
          </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  );
};

export default ProductPage;
