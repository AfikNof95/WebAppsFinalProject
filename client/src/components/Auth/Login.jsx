import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ERROR_MESSAGES } from './enums';
import styles from './Login.module.css';
import validator from 'validator';
import { blueGrey } from '@mui/material/colors';
import {
  Button,
  TextField,
  Link,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Backdrop,
  Alert,
  Snackbar,
  Toolbar,
  Card,
  CardContent,
  Grid,
  Avatar,
  InputAdornment,
  Divider,
  Container
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import LockOpenIcon from '@mui/icons-material/LockOpenRounded';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const AuthForm = () => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const emailPassReset = useRef();
  const displayNameInputRef = useRef();
  const photoUrlInput = useRef();
  const navigate = useNavigate();
  const { signIn, signUp, isUserSignedIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGES.PROCESS_COULD_NOT_FINISH);
  const [showResetPasswordValidation, setShowResetPasswordValidation] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({});
  const [showInputErrors, setShowInputErrors] = useState({
    email: false,
    password: false,
    displayName: false
  });
  const [photoURL, setPhotoURL] = useState('');
  const location = useLocation();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();
    const displayName = displayNameInputRef.current
      ? displayNameInputRef.current.value.trim()
      : true;

    const emailInputError = email === '';
    const passwordInputError = password === '';
    const displayNameError = displayName === '';

    setShowInputErrors({
      email: emailInputError,
      password: passwordInputError,
      displayName: displayNameError
    });

    if (emailInputError || passwordInputError || displayNameError) {
      return;
    }

    setIsLoading(true);

    const payload = { email, password };

    try {
      if (isLogin) {
        await signIn(payload);
      } else {
        await signUp({ ...payload, displayName, photoFile: photoUrlInput.current.files[0] });
      }
      setIsLoading(false);
      navigate(location.state ? location.state.redirect : '/');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errorMessage;
        Object.keys(ERROR_MESSAGES).forEach((message) => {
          if (ex.response.data.error.message.indexOf(message) !== -1) {
            errorMessage = message;
            return;
          }
        });

        errorMessage = errorMessage ? ERROR_MESSAGES[errorMessage] : ERROR_MESSAGES.GENERIC;
        setErrorMessage(errorMessage);
      }
      setIsLoading(false);
      setShowError(true);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const data = await signInWithPopup(auth, provider);
      signIn(data.user.uid);
      navigate('/');
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
    }
  };

  const passwordReset = async () => {
    const email = emailPassReset.current.value;
    if (!email || !validator.isEmail(email)) {
      setShowResetPasswordValidation(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setIsShownModal(false);
      setSnackBarMessage({
        severity: 'success',
        message: 'Password reset link was sent to: ' + email
      });
      setShowSnackBar(true);
    } catch (ex) {
      let message;
      switch (ex.code) {
        case 'auth/invalid-email':
          message = ERROR_MESSAGES.INVALID_EMAIL;
          break;
        case 'auth/user-not-found':
          message = ERROR_MESSAGES.USER_NOT_FOUND;
          break;
        default:
          message = ERROR_MESSAGES.PROCESS_COULD_NOT_FINISH;
          break;
      }
      setSnackBarMessage({
        severity: 'error',
        message: 'Password reset failed:' + message
      });
      setShowSnackBar(true);
    }
  };

  const showModal = () => {
    setIsShownModal(true);
  };

  const closeModal = () => {
    setIsShownModal(false);
  };

  useEffect(() => {
    setShowError(false);
    formRef.current.reset();
    setPhotoURL('');
  }, [isLogin]);

  useEffect(() => {
    if (isUserSignedIn()) {
      navigate({ pathname: '/' });
    }
  }, [isUserSignedIn, navigate]);

  const handlePhotoSelect = () => {
    const fileName = photoUrlInput.current.files[0].name;
    setPhotoURL(fileName);
  };

  const handleClearPhotoURL = () => {
    photoUrlInput.current.value = '';
    setPhotoURL('');
  };

  return (
    <>
      <Toolbar></Toolbar>
      <Container maxWidth={'50vw'} sx={{ height: 'calc(100vh - 64px)' }}>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'100%'}>
          <Card elevation={3} sx={{ width: '750px' }}>
            <Box padding={2} color={'white'} bgcolor={'var(--main-app-blue)'}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#385074'
                  }}>
                  <ShoppingCart fontSize="medium"></ShoppingCart>
                </Avatar>
                <Typography variant="h4" fontWeight={'bold'} marginLeft={2}>
                  Store.io
                </Typography>
              </Box>
            </Box>
            <Divider></Divider>
            <CardContent>
              <form onSubmit={submitHandler} id="loginForm" ref={formRef}>
                <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                  {(() => {
                    if (isLogin) {
                      return (
                        <>
                          <Typography variant="h3" marginBottom={1} fontWeight={'bold'}>
                            Hello again!
                          </Typography>
                          <Typography color={'gray'} fontWeight={'bold'} fontSize={'0.8em'}>
                            Welcome back, you have been missed!
                          </Typography>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Typography variant="h3" marginBottom={1} fontWeight={'bold'}>
                            Thank you for joining us!
                          </Typography>
                          <Typography color={'gray'} fontWeight={'bold'} fontSize={'0.8em'}>
                            We’re looking forward to a long and prosperous relationship.
                          </Typography>
                        </>
                      );
                    }
                  })()}
                </Box>
                <Box component="main">
                  <Box marginTop={4} display="flex" flexDirection={'column'} alignItems={'center'}>
                    {isLoading && (
                      <>
                        <Backdrop
                          open={true}
                          sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1
                          }}></Backdrop>
                        <CircularProgress
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: (theme) => theme.zIndex.drawer + 1
                          }}
                          size={'8em'}></CircularProgress>
                      </>
                    )}
                    <Box marginBottom={1} display={'flex'} flexDirection={'column'} width={'70%'}>
                      {!isLogin && (
                        <Grid container>
                          <Grid item xs={6}>
                            <TextField
                              id="display-name-input"
                              label="Display name*"
                              sx={{ marginBottom: 2 }}
                              inputRef={displayNameInputRef}
                              error={showInputErrors.displayName}
                              helperText={
                                showInputErrors.displayName ? ERROR_MESSAGES.DISPLAY_NAME_EMPTY : ''
                              }></TextField>
                          </Grid>
                          <Grid item xs={6}>
                            <Box display="flex" flexDirection={'row'} position={'relative'}>
                              <TextField
                                id="photoUrl"
                                label="Profile Picture"
                                variant="outlined"
                                type={'button'}
                                inputProps={{
                                  accept: 'image/*'
                                }}
                                onClick={() => photoUrlInput.current.click()}
                                value={photoURL}
                                fullWidth></TextField>
                              <Button
                                sx={{
                                  position: 'absolute',
                                  right: 0,
                                  bottom: 0,
                                  height: '100%',
                                  borderRadius: 0,
                                  boxShadow: 'none',
                                  padding: 0
                                }}
                                variant="contained"
                                color="mainButton"
                                onClick={handleClearPhotoURL}>
                                Clear
                              </Button>
                            </Box>
                            <TextField
                              type={'file'}
                              sx={{ display: 'none' }}
                              inputProps={{ accept: 'image/*' }}
                              onChange={handlePhotoSelect}
                              inputRef={photoUrlInput}></TextField>
                          </Grid>
                        </Grid>
                      )}
                      <TextField
                        id="outlined-input-email"
                        label="Email"
                        type="Email"
                        autoComplete="email"
                        inputRef={emailInputRef}
                        sx={{
                          marginBottom: 2
                        }}
                        error={showInputErrors.email}
                        helperText={showInputErrors.email ? ERROR_MESSAGES.EMAIL_EMPTY : ''}
                      />
                      <TextField
                        id="outlined-input-pass"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        inputRef={passwordInputRef}
                        error={showInputErrors.password}
                        helperText={showInputErrors.password ? ERROR_MESSAGES.WEAK_PASSWORD : ''}
                      />
                      <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        marginBottom={3}>
                        <Typography variant="caption" id="forPass" onClick={showModal}>
                          <Link sx={{ cursor: 'pointer' }}>
                            {isLogin ? 'Forgot password?' : ''}
                          </Link>
                        </Typography>

                        <Typography onClick={switchAuthModeHandler} variant="caption">
                          {isLogin ? 'Not a member?  ' : 'Already a member?  '}
                          <Link sx={{ cursor: 'pointer' }}>{isLogin ? 'Sign up' : 'Sign in'}</Link>
                        </Typography>
                      </Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="mainButton"
                        id="signIn"
                        endIcon={<SendIcon />}
                        fullWidth>
                        {isLogin ? 'SIGN IN' : 'SIGN UP'}
                      </Button>
                    </Box>
                    <Dialog open={isShownModal} onClose={closeModal}>
                      <DialogTitle bgcolor={'mainColor.main'} color={'mainColor.text'}>
                        Reset Your Password
                      </DialogTitle>
                      <DialogContent>
                        <Typography variant="body1" marginTop={1} fontWeight={500}>
                          Please enter your email address, further instructions will be sent to this
                          email address.
                        </Typography>
                        <Box component={'form'}>
                          <TextField
                            error={showResetPasswordValidation}
                            helperText={
                              showResetPasswordValidation
                                ? 'Please enter a valid email address!'
                                : ''
                            }
                            autoComplete="false"
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            inputRef={emailPassReset}
                          />
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={closeModal} color="mainButton">Cancel</Button>
                        <Button onClick={passwordReset} color="mainButton">Send</Button>
                      </DialogActions>
                    </Dialog>

                    <Box textAlign={'center'}>
                      <Typography>Or {isLogin ? 'sign in' : 'sign up'} with:</Typography>

                      <IconButton onClick={signInWithGoogle} color="primary">
                        <GoogleIcon id="google" fontSize={'large'}></GoogleIcon>
                      </IconButton>
                    </Box>
                    {showError && (
                      <Alert severity="error" variant="filled" sx={{ width: '50%', marginTop: 1 }}>
                        {errorMessage}
                      </Alert>
                    )}
                    <Snackbar
                      open={showSnackBar}
                      onClose={() => setShowSnackBar(false)}
                      autoHideDuration={3000}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}>
                      <Alert
                        severity={snackBarMessage.severity}
                        variant="filled"
                        sx={{ width: '100%', marginTop: 3 }}>
                        {snackBarMessage.message}
                      </Alert>
                    </Snackbar>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default AuthForm;
