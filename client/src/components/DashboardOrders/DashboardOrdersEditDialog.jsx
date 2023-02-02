import { forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
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
  InputLabel,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import backendAPI from "../../api";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultErrors = {
  name: false,
  description: false,
  price: false,
  quantity: false,
};

const DashboardOrdersEditDialog = ({
  order,
  open,
  handleDialogClose,
  handleDialogSave,
}) => {
  const [orderDetails, setOrderDetails] = useState(order);
  const [userAddresses, setUserAddresses] = useState([]);
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await backendAPI.admin.user.getAddresses(order.user);
        const { addresses } = response.data;
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
    if (orderDetails.name.trim() === "") {
      currentErrors.name = true;
    }
    if (orderDetails.description.trim() === "") {
      currentErrors.description = true;
    }
    if (orderDetails.price < 0) {
      currentErrors.price = true;
    }
    if (orderDetails.quantity < 0) {
      currentErrors.quantity = true;
    }
    if (!orderDetails.category._id) {
      currentErrors.category = true;
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
      case "address":
        value = userAddresses.filter(
          (address) => address._id === event.currentTarget.value
        )[0];
        break;
      case "quantity":
        value = Math.max(0, Number(event.currentTarget.value));
        break;
      case "price":
        value = Math.max(0, Number(event.currentTarget.value));
        break;
      case "isActive":
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

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ backgroundColor: "var(--main-app-blue)" }}>
          <Typography variant="caption">{orderDetails._id}</Typography>
          <IconButton
            edge="end"
            sx={{ color: "white", right: 15, position: "absolute" }}
            onClick={handleDialogClose}
          >
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="string"
                  variant="outlined"
                  defaultValue={orderDetails.name}
                  onChange={handleFormChange}
                  required
                  fullWidth
                  error={errors.name}
                  helperText={errors.name && "Please enter a valid name!"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="string"
                  multiline
                  rows={5}
                  variant="outlined"
                  defaultValue={orderDetails.description}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  error={errors.description}
                  helperText={
                    errors.description && "Please enter a valid description!"
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id="totalPrice"
                  label="Total Price($)"
                  type="number"
                  variant="outlined"
                  value={orderDetails.totalPrice}
                  onChange={handleFormChange}
                  error={errors.totalPrice}
                  helperText={
                    errors.totalPrice &&
                    "Price must be greater than or equal to 0!"
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id="quantity"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  value={orderDetails.quantity}
                  onChange={handleFormChange}
                  error={errors.quantity}
                  helperText={
                    errors.quantity &&
                    "Quantity must be greater than or equal to 0!"
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  label="Is active?"
                  labelPlacement="bottom"
                  control={
                    <Checkbox
                      id="isActive"
                      checked={orderDetails.isActive}
                      // onClick={() => handleProductIsActiveClick}
                      onChange={handleFormChange}
                    ></Checkbox>
                  }
                ></FormControlLabel>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  required
                  fullWidth
                  error={errors.category}
                  variant="outlined"
                >
                  <InputLabel>Address</InputLabel>
                  <Select
                    required
                    label={"Address"}
                    value={
                      orderDetails.address._id
                        ? orderDetails.address._id
                        : userAddresses[0]._id
                    }
                    id="address"
                    onChange={(event) =>
                      handleFormChange({
                        currentTarget: {
                          id: "address",
                          value: event.target.value,
                        },
                      })
                    }
                    fullWidth
                  >
                    {userAddresses.map((address) => {
                      return (
                        <MenuItem key={address._id} value={address._id}>
                          {`${address.city}, ${address.street} ${address.houseNumber}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.address && (
                    <FormHelperText>
                      Please select actions address!
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="info"
          variant="contained"
          sx={{ marginRight: 5, width: 150 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ width: 150 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardOrdersEditDialog;
