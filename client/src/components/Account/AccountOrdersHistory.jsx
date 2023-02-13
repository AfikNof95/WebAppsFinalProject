import { Alert, Box, CircularProgress, Divider, Grid, Snackbar, Typography } from '@mui/material';
import backendAPI from '../../api';
import { useEffect, useState } from 'react';
import AccountOrders from '../AccountOrders/AccountOrders';
import { ERROR_MESSAGES } from '../Auth/enums';
import AccountCancelOrderDialog from '../AccountOrders/AccountCancelOrderDialog';

const AccountOrdersHistory = ({ userId }) => {
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    message: '',
    severity: 'error'
  });
  const [currentOrder, setCurrentOrder] = useState({});
  const [isCancelOrderDialogOpen, setIsCancelOrderDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await backendAPI.user.getOrders(userId);
        setOrdersList(response.data);
        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    };
    fetchUserOrders();
  }, []);

  const showSuccessSnackBar = (message) => {
    setSnackBarState({
      show: true,
      severity: 'success',
      message
    });
  };

  const showErrorSnackbar = (ex) => {
    let message;
    if (ex.response && ex.response.status === 400) {
      Object.keys(ERROR_MESSAGES).forEach((errorMessage) => {
        if (ex.response.data.error.message.indexOf(errorMessage) !== -1) {
          message = errorMessage;
          return;
        }
      });

      message = message ? ERROR_MESSAGES[message] : ex.response.data.error.message;
    }
    setSnackBarState({
      show: true,
      message: message,
      severity: 'error'
    });
  };

  const handleOrderCancel = (order) => {
    setCurrentOrder(order);
    setIsCancelOrderDialogOpen(true);
  };

  const handleCancelOrderClose = () => {
    setCurrentOrder({});
    setIsCancelOrderDialogOpen(false);
  };

  const handelCancelOrderConfirm = async (order) => {
    try {
      const canceledOrder = { ...order, ...{ isActive: false } };
      const response = await backendAPI.order.update(canceledOrder);
      setOrdersList((currentState) => {
        return currentState.map((currentOrderState) => {
          if (currentOrderState._id === canceledOrder._id) {
            return { ...currentOrderState, ...canceledOrder };
          }
          return currentOrderState;
        });
      });
      setIsCancelOrderDialogOpen(false);
      setCurrentOrder({});
      showSuccessSnackBar('Order canceled successfully!');
    } catch (ex) {
      console.error(ex);
      showErrorSnackbar(ex);
    }
  };

  return (
    <>
      {isLoading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ width: '100%', height: '100vh' }}>
          <CircularProgress style={{ width: '50vh', height: '50vh' }} />
        </Box>
      ) : (
        <Grid container direction={'row'} height={'100%'} padding={5} spacing={2} overflow={'auto'}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent={'space-between'}>
                  <div>
                    <Typography
                      variant="overline"
                      fontWeight={'bold'}
                      fontSize={'1.2em'}
                      color={'Highlight'}
                      display={'block'}
                      lineHeight={'1'}>
                      Orders History
                    </Typography>
                    <Typography variant="caption" fontSize={'0.7em'} color={'GrayText'}>
                      Track your orders, cancel orders if available.
                    </Typography>
                  </div>
                </Box>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <AccountOrders
                  ordersList={ordersList}
                  handleOrderCancel={handleOrderCancel}></AccountOrders>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={snackBarState.show}
        onClose={() => setSnackBarState({ ...snackBarState, ...{ show: false } })}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <Alert
          severity={snackBarState.severity}
          variant="filled"
          sx={{ width: '100%', marginTop: 3 }}>
          {snackBarState.message}
        </Alert>
      </Snackbar>
      <AccountCancelOrderDialog
        order={currentOrder}
        open={isCancelOrderDialogOpen}
        handleDialogClose={handleCancelOrderClose}
        handleDialogConfirm={handelCancelOrderConfirm}></AccountCancelOrderDialog>
    </>
  );
};

export default AccountOrdersHistory;
