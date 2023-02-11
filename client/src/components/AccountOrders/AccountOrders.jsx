import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import AccountOrderCard from './AccountOrderCard';
import backendAPI from '../../api';
import AccountCancelOrderDialog from './AccountCancelOrderDialog';

const AccountOrders = ({ ordersList = [], handleOrderCancel }) => {
  const [orders, setOrders] = useState(ordersList);

  useEffect(() => {
    setOrders((currentState) => {
      return [...ordersList];
    });
  }, [ordersList]);

  return (
    <>
      <Grid container spacing={2}>
        {orders.map((order) => {
          return (
            <Grid item xs={12} key={order._id}>
              <AccountOrderCard
                order={order}
                handleOrderCancel={handleOrderCancel}></AccountOrderCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default AccountOrders;
