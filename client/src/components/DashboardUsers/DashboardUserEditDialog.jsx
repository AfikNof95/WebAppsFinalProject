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
  InputLabel,
  Avatar
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import Add from '@mui/icons-material/Add';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultErrors = {
  displayName: false,
  email: false,
  password: false
};

const DashboardUserEditDialog = ({ user, open, handleDialogClose, handleDialogSave }) => {
  const [userDetails, setUserDetails] = useState(() => {
    if (user.providerData) {
      return {
        ...user,
        ...(user.providerData[0].photoURL && { photoURL: user.providerData[0].photoURL })
      };
    }
    return user;
  });
  const [errors, setErrors] = useState(defaultErrors);
  const [profilePicture, setProfilePicture] = useState(() => {
    return userDetails.photoURL || 'http://localhost:2308/images/defaultAvatar.png';
  });
  const [previewImage, setPreviewImage] = useState(null);
  const profilePictureInput = useRef();

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors = {};
    if (!userDetails.displayName || userDetails.displayName.trim() === '') {
      currentErrors.displayName = true;
    }
    if (userDetails.email.trim() === '') {
      currentErrors.email = true;
    }
    if (userDetails.password && userDetails.password.trim().length <= 6) {
      currentErrors.password = true;
    }
    if (Object.keys(currentErrors).length === 0) {
      return true;
    }
    setErrors(currentErrors);
    return false;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      const newUserDetails = {
        uid: userDetails.uid,
        displayName: userDetails.displayName,
        email: userDetails.email,
        customClaims: userDetails.customClaims,
        ...(userDetails.password &&
          userDetails.password.trim() !== '' && { password: userDetails.password }),
        ...(userDetails.photoURL &&
          typeof userDetails.photoURL === 'object' && { photoURL: userDetails.photoURL }),
        disabled: userDetails.disabled
      };

      handleDialogSave(newUserDetails);
    }
  };

  const handleFormChange = (event) => {
    let key = event.currentTarget.id;
    let value;
    switch (event.currentTarget.id) {
      case 'disabled':
        value = event.currentTarget.checked;
        break;
      case 'isAdmin':
        value = { isAdmin: event.currentTarget.checked };
        key = 'customClaims';
        break;
      default:
        value = event.currentTarget.value;
        break;
    }
    setUserDetails((currentUserDetails) => {
      return { ...currentUserDetails, ...{ [key]: value } };
    });
  };

  const handleProfilePictureClear = () => {
    setPreviewImage('http://localhost:2308/images/defaultAvatar.png');
    setUserDetails((currentState) => {
      delete currentState.photoURL;
      return { ...currentState };
    });
  };
  const handleProfilePictureClick = () => {
    profilePictureInput.current.click();
  };

  const handleProfilePictureChange = () => {
    if (profilePictureInput.current.files[0].type.indexOf('image/') !== -1) {
      const image = URL.createObjectURL(profilePictureInput.current.files[0]);
      setPreviewImage(image);
      setUserDetails((currentState) => {
        return { ...currentState, ...{ photoURL: profilePictureInput.current.files[0] } };
      });
    }
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} disableEscapeKeyDown>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
          <Box display={'flex'} alignContent={'center'}>
            <Typography variant="h5" fontWeight={'bold'}>
              {user.displayName}
            </Typography>
          </Box>

          <IconButton
            edge="end"
            sx={{ color: 'white', right: 15, position: 'absolute' }}
            onClick={handleDialogClose}>
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container gap={1}>
          <Grid item xs={12} justifyContent={'center'} alignItems={'center'}>
            <Avatar
              onClick={handleProfilePictureClick}
              sx={{ height: 120, width: 120, margin: 'auto', cursor: 'pointer' }}
              src={previewImage || profilePicture}></Avatar>
            <TextField
              inputProps={{
                accept: 'image/*'
              }}
              sx={{ display: 'none' }}
              type={'file'}
              onChange={handleProfilePictureChange}
              inputRef={profilePictureInput}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="displayName"
              label="Display Name"
              type="string"
              variant="outlined"
              defaultValue={userDetails.displayName}
              onChange={handleFormChange}
              required
              fullWidth
              error={errors.displayName}
              helperText={errors.displayName && 'Please enter a valid name!'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="string"
              variant="outlined"
              defaultValue={userDetails.email}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.email}
              helperText={errors.email && 'Please enter a valid email!'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.password}
              helperText={errors.password && 'Password should have at least 6 characters!'}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent={'space-between'}>
              <FormControlLabel
                label="Is active?"
                labelPlacement="top"
                control={
                  <Checkbox
                    id="disabled"
                    checked={!userDetails.disabled}
                    onChange={handleFormChange}></Checkbox>
                }></FormControlLabel>
              <FormControlLabel
                label="Is Admin?"
                labelPlacement="top"
                control={
                  <Checkbox
                    id="isAdmin"
                    checked={userDetails.customClaims ? userDetails.customClaims.isAdmin : false}
                    onChange={handleFormChange}></Checkbox>
                }></FormControlLabel>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} direction={'row'} width={'100%'}>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleDialogClose} color="secondaryButton.light" startIcon={<CancelOutlined></CancelOutlined>} variant="outlined">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSubmit} color="mainButton" variant="contained" fullWidth startIcon={<SaveOutlined></SaveOutlined>}>
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardUserEditDialog;
