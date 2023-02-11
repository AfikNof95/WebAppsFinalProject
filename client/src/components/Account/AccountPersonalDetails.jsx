import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Divider,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material';
import { ERROR_MESSAGES } from '../Auth/enums';
import { useLocation } from 'react-router-dom';
import {
  Add,
  Cancel,
  Edit as EditIcon,
  Email as EmailIcon,
  Password as PasswordIcon,
  Person as PersonIcon,
  Save
} from '@mui/icons-material';
import AccountAddresses from '../AccountAddresses/AccountAddresses';
import backendAPI from '../../api';

const AccountPersonalDetails = () => {
  const locationState = useLocation();
  const { updateUser, getUserProfilePicture, updatePassword, currentUser } = useAuth();
  const [pass, setPass] = useState('* * * * * * ');
  const [showInputErrors, setShowInputErrors] = useState({
    email: false,
    displayName: false
  });
  const [displayName, setDisplayName] = useState(() => currentUser.displayName);
  const [email, setEmail] = useState(() => currentUser.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [snackBarState, setSnackBarState] = useState({
    show: false,
    message: '',
    severity: 'error'
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditSecurity, setIsEditSecurity] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    show: false,
    message: 'Passwords do not match!'
  });
  const [previewImage, setPreviewImage] = useState(null);

  const addressListComponent = useRef();
  const profilePictureInput = useRef();

  const handleEditDetailsClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEditDetails = () => {
    setIsEditMode(false);
  };

  const handleEditSecurityClick = () => {
    setIsEditSecurity(true);
  };

  const handleSaveDetails = async () => {
    try {
      if (displayName.trim() !== '' && email.trim() !== '') {
        const photoResponse = await backendAPI.user.uploadPhoto(
          profilePictureInput.current.files[0]
        );
        const photoUrl = photoResponse.data.photoUrl;
        await updateUser({
          idToken: currentUser.idToken,
          displayName,
          email,
          photoUrl: photoUrl || currentUser.photoUrl
        });
        showSuccessSnackBar('User updated successfully!');
        setIsEditMode(false);
      }
    } catch (ex) {
      showErrorSnackbar(ex);
    }
  };
  const handleSaveSecurity = async () => {
    try {
      if (newPassword === confirmNewPassword && newPassword.trim().length >= 6) {
        await updatePassword(newPassword);
        showSuccessSnackBar('Password updated successfully!');
        setIsEditSecurity(false);
      }
    } catch (ex) {
      showErrorSnackbar(ex);
    }
  };

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

  const handleCancelEditSecurity = () => {
    setIsEditSecurity(false);
  };

  const handleAddAddressClick = () => {
    addressListComponent.current.handleAddAddress();
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.currentTarget.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.currentTarget.value);
  };
  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.currentTarget.value);
  };

  const handleProfilePictureClick = () => {
    if (isEditMode) {
      profilePictureInput.current.click();
    }
  };

  const handleProfilePictureChange = () => {
    if (profilePictureInput.current.files[0].type.indexOf('image/') !== -1) {
      const image = URL.createObjectURL(profilePictureInput.current.files[0]);
      setPreviewImage(image);
    }
  };

  useEffect(() => {
    if (newPassword === '' && confirmNewPassword === '') {
      setPasswordErrors({
        show: false,
        message: 'Passwords do not match!'
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordErrors({
        show: true,
        message: 'Passwords do not match!'
      });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordErrors({
        show: true,
        message: 'Please enter at least 6 characters'
      });
      return;
    }
    setPasswordErrors({
      show: false,
      message: 'Passwords do not match!'
    });
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    setShowInputErrors({
      email: false,
      displayName: false
    });
    if (displayName.trim() === '') {
      setShowInputErrors((currentState) => ({ ...currentState, ...{ displayName: true } }));
    }
    if (email.trim() === '') {
      setShowInputErrors((currentState) => ({ ...currentState, ...{ email: true } }));
    }
  }, [displayName, email]);

  return (
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
                  Personal Details
                </Typography>
                <Typography variant="caption" fontSize={'0.7em'} color={'GrayText'}>
                  Update your photo and personal details
                </Typography>
              </div>
              {(() => {
                if (isEditSecurity) {
                  return;
                }
                if (!isEditMode) {
                  return (
                    <IconButton color="primary" onClick={handleEditDetailsClick}>
                      <EditIcon></EditIcon>
                    </IconButton>
                  );
                }
                return (
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Tooltip
                      title="Cancel"
                      placement="top"
                      children={
                        <IconButton color="secondaryButton" onClick={handleCancelEditDetails}>
                          <Cancel></Cancel>
                        </IconButton>
                      }></Tooltip>

                    <Tooltip title="Save" placement="top">
                      <IconButton color="mainButton" onClick={handleSaveDetails}>
                        <Save></Save>
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              })()}
            </Box>

            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} marginBottom={2}>
              <Grid item xs={6} xl={3}>
                <Typography variant="body1" fontWeight={500}>
                  Display Name
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                    readOnly: !isEditMode
                  }}
                  inputMode="text"
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                  value={displayName}
                  fullWidth
                  error={showInputErrors.displayName}
                  helperText={showInputErrors.displayName && 'Please enter a valid display name!'}
                  onChange={handleDisplayNameChange}></TextField>
              </Grid>
            </Grid>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} marginBottom={2}>
              <Grid item xs={6} xl={3}>
                <Typography variant="body1" fontWeight={500}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  inputMode="email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                    readOnly: !isEditMode
                  }}
                  sx={{ backgroundColor: 'white' }}
                  value={email}
                  fullWidth
                  error={showInputErrors.email}
                  helperText={showInputErrors.email && 'Please enter a valid email!'}
                  onChange={handleEmailChange}></TextField>
              </Grid>
            </Grid>
            {isEditMode && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ marginBottom: 2 }}>
                  Please note that if you change your email, you will be required to sign in again.
                </Alert>
              </Grid>
            )}

            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} marginBottom={2}>
              <Grid item xs={6} xl={3}>
                <Typography variant="body1" fontWeight={500}>
                  Profile Picture
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Avatar
                  src={previewImage || getUserProfilePicture()}
                  sx={{ width: 60, height: 60, cursor: 'pointer' }}
                  onClick={handleProfilePictureClick}></Avatar>
                <TextField
                  inputProps={{
                    accept: 'image/*'
                  }}
                  sx={{ display: 'none' }}
                  type={'file'}
                  onChange={handleProfilePictureChange}
                  inputRef={profilePictureInput}></TextField>
              </Grid>
            </Grid>
            <Divider></Divider>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" width={'100%'} justifyContent={'space-between'}>
              <div>
                <Typography
                  variant="overline"
                  fontWeight={'bold'}
                  fontSize={'1.2em'}
                  color={'Highlight'}
                  display={'block'}
                  lineHeight={'1'}>
                  Account Security
                </Typography>
                <Typography variant="caption" fontSize={'0.7em'} color={'GrayText'}>
                  Update your password
                </Typography>
              </div>

              {(() => {
                if (isEditMode) {
                  return;
                }
                if (!isEditSecurity) {
                  return (
                    <IconButton color="primary" onClick={handleEditSecurityClick}>
                      <EditIcon></EditIcon>
                    </IconButton>
                  );
                }
                return (
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Tooltip
                      title="Cancel"
                      placement="top"
                      children={
                        <IconButton color="secondaryButton" onClick={handleCancelEditSecurity}>
                          <Cancel></Cancel>
                        </IconButton>
                      }></Tooltip>

                    <Tooltip title="Save" placement="top">
                      <IconButton color="mainButton" onClick={handleSaveSecurity}>
                        <Save></Save>
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              })()}
            </Box>

            <Divider></Divider>
          </Grid>

          {(() =>
            isEditSecurity ? (
              <>
                <Grid item xs={12}>
                  <Grid container alignItems={'center'}>
                    <Grid item xs={6} xl={3}>
                      <Typography variant="body1" fontWeight={500}>
                        New Password
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordIcon />
                            </InputAdornment>
                          ),
                          readOnly: !isEditSecurity
                        }}
                        inputMode="password"
                        type={'password'}
                        variant="outlined"
                        sx={{ backgroundColor: 'white' }}
                        value={newPassword}
                        error={passwordErrors.show}
                        helperText={passwordErrors.show && passwordErrors.message}
                        onChange={handleNewPasswordChange}
                        fullWidth></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems={'center'}>
                    <Grid item xs={6} xl={3}>
                      <Typography variant="body1" fontWeight={500}>
                        Confirm New Password
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordIcon />
                            </InputAdornment>
                          ),
                          readOnly: !isEditSecurity
                        }}
                        inputMode="password"
                        type={'password'}
                        variant="outlined"
                        sx={{ backgroundColor: 'white' }}
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        fullWidth></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Grid container alignItems={'center'}>
                  <Grid item xs={6} xl={3}>
                    <Typography variant="body1" fontWeight={500}>
                      Password
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordIcon />
                          </InputAdornment>
                        ),
                        readOnly: true
                      }}
                      inputMode="text"
                      variant="outlined"
                      sx={{ backgroundColor: 'white' }}
                      value={pass}
                      fullWidth></TextField>
                  </Grid>
                </Grid>
              </Grid>
            ))()}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" width={'100%'} justifyContent={'space-between'}>
              <div>
                <Typography
                  variant="overline"
                  fontWeight={'bold'}
                  fontSize={'1.2em'}
                  color={'Highlight'}
                  display={'block'}
                  lineHeight={'1'}>
                  Addresses
                </Typography>
                <Typography variant="caption" fontSize={'0.7em'} color={'GrayText'}>
                  Update your shipment addresses
                </Typography>
              </div>
              <IconButton color="info" onClick={handleAddAddressClick}>
                <Add></Add>
              </IconButton>
            </Box>

            <Divider></Divider>
          </Grid>

          <Grid item xs={12}>
            <AccountAddresses
              ref={addressListComponent}
              userId={currentUser.localId}></AccountAddresses>
          </Grid>
        </Grid>
      </Grid>

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
    </Grid>
  );
};

export default AccountPersonalDetails;
