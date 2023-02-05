import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
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
  InputLabel
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import Add from '@mui/icons-material/Add';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultErrors = {
  name: false,
  description: false,
  price: false,
  quantity: false
};

const DashboardProductsDialog = ({
  product,
  categories,
  open,
  handleDialogClose,
  handleDialogSave
}) => {
  const [productDetails, setProductDetails] = useState(product);
  const [errors, setErrors] = useState(defaultErrors);
  const [isShowAddImage, setIsShowAddImage] = useState(false);
  const [addImageErrorState, setAddImageErrorState] = useState({
    show: false,
    message: ''
  });
  const mainImage = useRef();
  const imageURLInput = useRef();
  const handleImageClick = (img) => {
    mainImage.current.src = img;
  };

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors = {};
    if (productDetails.name.trim() === '') {
      currentErrors.name = true;
    }
    if (productDetails.description.trim() === '') {
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
      case 'category':
        value = categories.filter((cat) => cat._id === event.currentTarget.value)[0];
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
    setProductDetails((currentProductDetails) => {
      return { ...currentProductDetails, ...{ [key]: value } };
    });
  };

  const handleAddImageClick = () => {
    setIsShowAddImage(true);
  };
  const handleAddImageSubmit = async () => {
    try {
      const imageURL = imageURLInput.current.value;
      if (imageURL.indexOf('http') === -1 && imageURL.indexOf('data:image') === -1) {
        throw new Error('Image not found!');
      }
      await fetch({
        url: imageURL,
        method: 'GET'
      });
      setProductDetails((currentProductDetails) => {
        currentProductDetails.images.push(imageURL);
        return { ...currentProductDetails };
      });
      setIsShowAddImage(false);
    } catch (ex) {
      setAddImageErrorState({
        show: true,
        message: 'Image is not valid!'
      });
    }
  };
  const handleCloseAddImage = () => {
    setIsShowAddImage(false);
  };

  const handleRemoveImage = (url) => {
    setProductDetails((currentProductDetails) => {
      currentProductDetails.images.splice(currentProductDetails.images.indexOf(url), 1);
      return { ...currentProductDetails };
    });
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
          <Typography variant="caption">{productDetails.name}</Typography>
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
          <Grid item xs={6}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Stack gap={2} direction={'row'}>
                <Stack direction={'column'} gap={2}>
                  {productDetails.images.map((image) => {
                    return (
                      <Box
                        key={image}
                        sx={{ position: 'relative' }}
                        width={50}
                        height={50}
                        border={'1px solid #cecece'}>
                        <IconButton
                          type="button"
                          color="error"
                          sx={{
                            position: 'absolute',
                            top: -25,
                            right: -25,
                            zIndex: 99
                          }}
                          onClick={() => handleRemoveImage(image)}>
                          <Close></Close>
                        </IconButton>

                        <img
                          src={image}
                          style={{
                            cursor: 'pointer',
                            objectFit: 'contain'
                          }}
                          alt=""
                          width={'100%'}
                          height={'100%'}
                          onClick={() => handleImageClick(image)}></img>
                      </Box>
                    );
                  })}
                </Stack>
                <Stack direction={'column'}>
                  <IconButton
                    size="sm"
                    color="success"
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgb(46, 125, 50)',
                      '&:hover': {
                        backgroundColor: 'rgb(56 159 61)'
                      }
                    }}
                    onClick={handleAddImageClick}>
                    <Add></Add>
                  </IconButton>
                </Stack>
              </Stack>

              <Box width={600}>
                <img
                  ref={mainImage}
                  src={productDetails.images[0]}
                  style={{ objectFit: 'contain' }}
                  width={'100%'}
                  height={400}
                  alt=""></img>
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
                  helperText={errors.name && 'Please enter a valid name!'}
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
                  helperText={errors.description && 'Please enter a valid description!'}
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
                  helperText={errors.price && 'Price must be greater than or equal to 0!'}
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
                  helperText={errors.quantity && 'Quantity must be greater than or equal to 0!'}
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
                      onChange={handleFormChange}></Checkbox>
                  }></FormControlLabel>
              </Grid>
              <Grid item xs={4}>
                <FormControl required fullWidth error={errors.category} variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    required
                    label={'Category'}
                    value={
                      productDetails.category._id ? productDetails.category._id : categories[0]._id
                    }
                    id="category"
                    onChange={(event) =>
                      handleFormChange({
                        currentTarget: {
                          id: 'category',
                          value: event.target.value
                        }
                      })
                    }
                    fullWidth>
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.category && <FormHelperText>Please select a category!</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent={'flex-end'} width="100%">
          <Button
            onClick={handleDialogClose}
            startIcon={<CancelOutlined></CancelOutlined>}
            color={'secondaryButton.light'}
            variant="outlined"
            fullWidth
            sx={{ marginRight: 5, maxWidth: 350 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="mainButton"
            startIcon={<SaveOutlined></SaveOutlined>}
            variant="contained"
            fullWidth
            sx={{ maxWidth: 350 }}>
            Save
          </Button>
        </Box>
      </DialogActions>
      <Dialog open={isShowAddImage} fullWidth maxWidth="md">
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
            <Typography variant="body2">Add New Image</Typography>
            <IconButton
              edge="end"
              sx={{
                color: 'white',
                right: 15,
                position: 'absolute'
              }}
              onClick={handleCloseAddImage}>
              <Close></Close>
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            required
            fullWidth
            inputRef={imageURLInput}
            type={'text'}
            variant="standard"
            label="Image URL"
            error={addImageErrorState.show}
            helperText={addImageErrorState.show ? addImageErrorState.message : ''}></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddImage} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAddImageSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default DashboardProductsDialog;
