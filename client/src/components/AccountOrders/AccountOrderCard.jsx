import { Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { Cancel } from '@mui/icons-material';
const AccountOrderCard = ({ order, handleOrderCancel }) => {
  const [orderObject, setOrderObject] = useState(order);
  const [orderDate, setOrderDate] = useState(null);

  useEffect(() => {
    setOrderObject(() => ({ ...order }));
    setOrderDate(() => {
      return new Date(order.createdAt).toLocaleString();
    });
  }, [order]);

  return (
    <Paper>
      <Box
        position="relative"
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
        justifyContent={'space-between'}
        sx={{ backgroundColor: (theme) => theme.palette.mainButton.main }}
        padding={2}>
        <div>
          <Typography
            variant="body1"
            fontWeight={'bold'}
            sx={{ wordBreak: 'break-all' }}
            color="white">
            Order #{orderObject._id}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={'bold'}
            fontSize={'0.8em'}
            color="white">
            Date: {orderDate}
          </Typography>
        </div>
        <Typography variant="body1" fontWeight={'bold'} color="white">
          Status: {order.isActive ? order.status : 'Canceled'}
        </Typography>
      </Box>

      <Grid container padding={3}>
        <Grid item xs={12}>
          <Grid container>
            {orderObject.products.map((product) => {
              return (
                <Grid item xs={12} key={product.product._id}>
                  <Grid container spacing={1} marginBottom={1} marginTop={1}>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      <Box display="flex" width={'100%'} height={'100%'} marginBottom={1}>
                        <img
                          width={'100%'}
                          height={'100%'}
                          key={product.product._id}
                          src={product.product.images[0]}
                          alt=""
                          style={{
                            objectFit: 'contain',
                            maxWidth: 200,
                            maxHeight: 200
                          }}></img>
                      </Box>
                    </Grid>
                    <Grid item xs={11} lg={11}>
                      <Box display={'flex'} alignItems={'center'} height={'100%'}>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          fontSize={'1em'}
                          // overflow={'hidden'}
                          textOverflow={'ellipsis'}
                          whiteSpace={'break-spaces'}>
                          {product.product.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography textAlign={'end'}>
                        Price: {formatPrice(product.product.price)}
                      </Typography>
                      <Typography textAlign={'end'}>Qty: {product.quantity}</Typography>
                    </Grid>
                  </Grid>

                  <Divider></Divider>
                </Grid>
              );
            })}

            <Grid item xs={12} marginTop={2}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                alignItems={'center'}>
                <div>
                  <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    display={'inline-block'}
                    marginRight={1}>
                    Total Price:
                  </Typography>
                  <Typography variant="body2" fontWeight={'bold'} display={'inline-block'}>
                    {formatPrice(orderObject.totalPrice)}
                  </Typography>
                </div>

                {order.status === 'Created' && order.isActive === true && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 'auto' }}
                    onClick={() => handleOrderCancel(orderObject)}>
                    Cancel Order
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountOrderCard;
