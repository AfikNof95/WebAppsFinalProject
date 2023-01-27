import { forwardRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
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
import { useRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultErrors = {
  name: false,
  description: false,
  price: false,
  quantity: false,
};

const DashboardProductsDialog = ({
  product,
  categories,
  open,
  handleDialogClose,
  handleDialogSave,
}) => {
  const [productDetails, setProductDetails] = useState(product);
  const [errors, setErrors] = useState(defaultErrors);
  const mainImage = useRef();
  const handleImageClick = (img) => {
    mainImage.current.src = img;
  };

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors = {};
    if (productDetails.name.trim() === "") {
      currentErrors.name = true;
    }
    if (productDetails.description.trim() === "") {
      currentErrors.description = true;
    }
    if (productDetails.price < 0) {
      currentErrors.price = true;
    }
    if (productDetails.quantity < 0) {
      currentErrors.quantity = true;
    }
    if (!productDetails.category._id) {
      currentErrors.category = true;
    }
    if (Object.keys(currentErrors).length === 0) {
      return true;
    }
    setErrors(currentErrors);
    return false;
  };
  const handleSubmit = () => {
    if (validateForm()) handleDialogSave(productDetails);
  };

  const handleFormChange = (event) => {
    const key = event.currentTarget.id;
    let value;
    switch (event.currentTarget.id) {
      case "category":
        value = categories.filter(
          (cat) => cat._id === event.currentTarget.value
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
    setProductDetails((currentProductDetails) => {
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
        <Toolbar sx={{ backgroundColor: "#24344c" }}>
          <Typography variant="caption">{productDetails.name}</Typography>
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
          <Grid item xs={6}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack direction={"column"} gap={2}>
                {productDetails.images.map((image) => {
                  return (
                    <Box
                      key={image}
                      sx={{ position: "relative" }}
                      width={50}
                      height={50}
                      border={"1px solid #cecece"}
                    >
                      <IconButton
                        type="button"
                        color="error"
                        sx={{
                          position: "absolute",
                          top: -25,
                          right: -25,
                          zIndex: 99,
                        }}
                      >
                        <Close></Close>
                      </IconButton>

                      <img
                        src={image}
                        style={{ cursor: "pointer", objectFit: "contain" }}
                        alt=""
                        width={"100%"}
                        height={"100%"}
                        onClick={() => handleImageClick(image)}
                      ></img>
                    </Box>
                  );
                })}
              </Stack>
              <Box width={600}>
                <img
                  ref={mainImage}
                  src={productDetails.images[0]}
                  style={{ objectFit: "contain" }}
                  width={"100%"}
                  height={400}
                  alt=""
                ></img>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="string"
                  variant="outlined"
                  defaultValue={productDetails.name}
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
                  defaultValue={productDetails.description}
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
                  id="price"
                  label="Price($)"
                  type="number"
                  variant="outlined"
                  value={productDetails.price}
                  onChange={handleFormChange}
                  error={errors.price}
                  helperText={
                    errors.price && "Price must be greater than or equal to 0!"
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
                  value={productDetails.quantity}
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
                      checked={productDetails.isActive}
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
                  <InputLabel>Category</InputLabel>
                  <Select
                    required
                    label={"Category"}
                    value={
                      productDetails.category._id
                        ? productDetails.category._id
                        : categories[0]._id
                    }
                    id="category"
                    onChange={(event) =>
                      handleFormChange({
                        currentTarget: {
                          id: "category",
                          value: event.target.value,
                        },
                      })
                    }
                    fullWidth
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.category && (
                    <FormHelperText>Please select a category!</FormHelperText>
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

export default DashboardProductsDialog;
