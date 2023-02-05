import { forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  Slide,
  FormControl,
  FormHelperText,
  InputLabel
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import backendAPI from '../../api';
import ProductList from './ProductList';
import { Cancel, CancelOutlined, Save, SaveOutlined } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultErrors = {
  status: false,
  totalPrice: false,
  address: false
};

const DashboardOrdersEditDialog = ({ order, open, handleDialogClose, handleDialogSave }) => {
  const [orderDetails, setOrderDetails] = useState(order);
  const [userAddresses, setUserAddresses] = useState([]);
  const [errors, setErrors] = useState(defaultErrors);
  const [orderStatuses, setOrderStatuses] = useState(['Created', 'Packed', 'Delivered']);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await backendAPI.admin.user.getAddresses(order.user);
        const addresses = response.data;
        setUserAddresses(addresses || []);
      } catch (ex) {
        console.error(ex.message);
      }
    };
    fetchUserAddresses();
  }, [order]);

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors = {};
    if (orderDetails.totalPrice < 0) {
      currentErrors.totalPrice = true;
    }
    if (!orderDetails.status) {
      currentErrors.status = true;
    }
    if (!orderDetails.address._id) {
      currentErrors.address = true;
    }
    if (Object.keys(currentErrors).length === 0) {
      return true;
    }
    setErrors(currentErrors);
    return false;
  };
  const handleSubmit = () => {
    if (validateForm()) handleDialogSave(orderDetails);
  };

  const handleFormChange = (event) => {
    const key = event.currentTarget.id;
    let value;
    switch (event.currentTarget.id) {
      case 'address':
        value = userAddresses.filter((address) => address._id === event.currentTarget.value)[0];
        break;
      case 'quantity':
        value = Math.max(0, Number(event.currentTarget.value));
        break;
      case 'price':
        value = Math.max(0, Number(event.currentTarget.value));
        break;
      case 'isActive':
        value = event.currentTarget.checked;
        break;
      default:
        value = event.currentTarget.value;
        break;
    }
    setOrderDetails((currentProductDetails) => {
      return { ...currentProductDetails, ...{ [key]: value } };
    });
  };

  const handleProductsUpdate = (newProducts) => {
    let newPrice = 0;
    newProducts.map((product) => {
      newPrice += product.quantity * product.product.price;
      return product;
    });
    setOrderDetails((currentState) => ({
      ...currentState,
      ...{ products: newProducts, totalPrice: newPrice }
    }));
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
          <Typography variant="caption">{orderDetails._id}</Typography>
          <IconButton
            edge="end"
            sx={{ color: 'white', right: 15, position: 'absolute' }}
            onClick={handleDialogClose}>
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="totalPrice"
                  label="Total Price($)"
                  type="number"
                  variant="outlined"
                  inputProps={{
                    min:0
                  }}
                  value={orderDetails.totalPrice}
                  onChange={handleFormChange}
                  error={errors.totalPrice}
                  helperText={errors.totalPrice && 'Price must be greater than or equal to 0!'}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  required
                  fullWidth
                  error={errors.status}
                  variant="outlined"
                  margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    required
                    label={'Status'}
                    value={orderDetails.status}
                    id="status"
                    onChange={(event) =>
                      handleFormChange({
                        currentTarget: {
                          id: 'status',
                          value: event.target.value
                        }
                      })
                    }
                    fullWidth>
                    {orderStatuses.map((status) => {
                      return (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.address && <FormHelperText>Please select a status!</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  required
                  fullWidth
                  error={errors.address}
                  variant="outlined"
                  margin="dense">
                  <InputLabel>Address</InputLabel>
                  <Select
                    required
                    label={'Address'}
                    value={
                      orderDetails.address._id ? orderDetails.address._id : userAddresses[0]._id
                    }
                    id="address"
                    onChange={(event) =>
                      handleFormChange({
                        currentTarget: {
                          id: 'address',
                          value: event.target.value
                        }
                      })
                    }
                    fullWidth>
                    {userAddresses.map((address) => {
                      return (
                        <MenuItem key={address._id} value={address._id}>
                          {`${address.city}, ${address.street} ${address.houseNumber}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.address && <FormHelperText>Please select an address!</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ProductList
                  products={orderDetails.products}
                  handleProductsUpdate={handleProductsUpdate}></ProductList>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleDialogClose}
          color="secondaryButton.light"
          variant="outlined"
          sx={{ marginRight: 5, maxWidth: 350 }}
          fullWidth
          startIcon={<CancelOutlined></CancelOutlined>}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="mainButton"
          variant="contained"
          sx={{ maxWidth: 350 }}
          fullWidth
          startIcon={<SaveOutlined />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardOrdersEditDialog;
