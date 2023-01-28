import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES } from "./enums";
import styles from "./Login.module.css";
import validator from "validator";
import { blueGrey } from "@mui/material/colors";
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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import LockOpenIcon from "@mui/icons-material/LockOpenRounded";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const emailPassReset = useRef();
  const displayNameInputRef = useRef();
  const navigate = useNavigate();
  const { signIn, signUp, isUserSignedIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    ERROR_MESSAGES.PROCESS_COULD_NOT_FINISH
  );
  const [showResetPasswordValidation, setShowResetPasswordValidation] =
    useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({});
  const [showInputErrors, setShowInputErrors] = useState({
    email: false,
    password: false,
    displayName: false,
  });

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

    const emailInputError = email === "";
    const passwordInputError = password === "";
    const displayNameError = displayName === "";

    setShowInputErrors({
      email: emailInputError,
      password: passwordInputError,
      displayName: displayNameError,
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
        await signUp({ ...payload, displayName });
      }
      setIsLoading(false);
      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const message = ERROR_MESSAGES[ex.response.data.error.message]
          ? ERROR_MESSAGES[ex.response.data.error.message]
          : ERROR_MESSAGES.TOO_MANY_ATTEMPTS;
        setErrorMessage(message);
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
      navigate("/");
      setIsLoading(false);
      // localStorage.clear();
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
        severity: "success",
        message: "Password reset link was sent to: " + email,
      });
      setShowSnackBar(true);
    } catch (ex) {
      let message;
      switch (ex.code) {
        case "auth/invalid-email":
          message = ERROR_MESSAGES.INVALID_EMAIL;
          break;
        case "auth/user-not-found":
          message = ERROR_MESSAGES.USER_NOT_FOUND;
          break;
        default:
          message = ERROR_MESSAGES.PROCESS_COULD_NOT_FINISH;
          break;
      }
      setSnackBarMessage({
        severity: "error",
        message: "Password reset failed:" + message,
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
    delete emailInputRef.current.value;
    delete passwordInputRef.current.value;
    displayNameInputRef.current && delete displayNameInputRef.current.value;
  }, [isLogin]);

  useEffect(() => {
    if (isUserSignedIn()) {
      navigate({ pathname: "/" });
    }
  }, [isUserSignedIn, navigate]);

  return (
    <section className={styles.auth}>
      <Toolbar></Toolbar>
      <Grid
        container
        spacing={0}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"80vh"}
      >
        <Card elevation={2} sx={{ width: "750px" }}>
          <Box
            marginTop={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Avatar sx={{ width: 70, height: 70, bgcolor: blueGrey[700] }}>
              <LockOpenIcon fontSize={"large"}></LockOpenIcon>
            </Avatar>
          </Box>
          <CardContent>
            <form onSubmit={submitHandler} id="loginForm">
              <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                {(() => {
                  if (isLogin) {
                    return (
                      <>
                        <Typography variant="h2">Hello again!</Typography>
                        <Typography variant="subtitle2" color={"gray"}>
                          Welcome back, you have been missed!
                        </Typography>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Typography variant="h2">
                          Thank you for joining us!
                        </Typography>
                        <Typography variant="subtitle2" color={"gray"}>
                          We’re looking forward to a long and prosperous
                          relationship.
                        </Typography>
                      </>
                    );
                  }
                })()}
              </Box>
              <Box component="main">
                <Box
                  marginTop={4}
                  display="flex"
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  {isLoading && (
                    <>
                      <Backdrop
                        open={true}
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                      ></Backdrop>
                      <CircularProgress
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        size={"8em"}
                      ></CircularProgress>
                    </>
                  )}
                  <Box
                    marginBottom={2}
                    display={"flex"}
                    flexDirection={"column"}
                    width={"50%"}
                  >
                    {!isLogin && (
                      <TextField
                        id="display-name-input"
                        label="Display name"
                        sx={{ marginBottom: 2 }}
                        inputRef={displayNameInputRef}
                        error={showInputErrors.displayName}
                        helperText={
                          showInputErrors.displayName
                            ? ERROR_MESSAGES.DISPLAY_NAME_EMPTY
                            : ""
                        }
                      ></TextField>
                    )}
                    <TextField
                      id="outlined-input-email"
                      label="Email"
                      type="Email"
                      autoComplete="email"
                      inputRef={emailInputRef}
                      sx={{
                        marginBottom: 2,
                      }}
                      error={showInputErrors.email}
                      helperText={
                        showInputErrors.email ? ERROR_MESSAGES.EMAIL_EMPTY : ""
                      }
                    />
                    <TextField
                      id="outlined-input-pass"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      inputRef={passwordInputRef}
                      error={showInputErrors.password}
                      helperText={
                        showInputErrors.password
                          ? ERROR_MESSAGES.WEAK_PASSWORD
                          : ""
                      }
                    />
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      marginBottom={3}
                    >
                      <Typography
                        variant="caption"
                        id="forPass"
                        onClick={showModal}
                      >
                        <Link sx={{ cursor: "pointer" }}>
                          {isLogin ? "Forgot password?" : ""}
                        </Link>
                      </Typography>

                      <Typography
                        onClick={switchAuthModeHandler}
                        variant="caption"
                      >
                        {isLogin ? "Not a member?  " : "Already a member?  "}
                        <Link sx={{ cursor: "pointer" }}>
                          {isLogin ? "Sign up" : "Sign in"}
                        </Link>
                      </Typography>
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      id="signIn"
                      endIcon={<SendIcon />}
                      fullWidth
                    >
                      {isLogin ? "SIGN IN" : "SIGN UP"}
                    </Button>
                  </Box>
                  <Dialog open={isShownModal} onClose={closeModal}>
                    <DialogTitle>Reset Your Password</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please enter your email address, further instructions
                        will be sent to this email address.
                      </DialogContentText>
                      <Box component={"form"}>
                        <TextField
                          error={showResetPasswordValidation}
                          helperText={
                            showResetPasswordValidation
                              ? "Please enter a valid email address!"
                              : ""
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
                      <Button onClick={closeModal}>Cancel</Button>
                      <Button onClick={passwordReset}>Send</Button>
                    </DialogActions>
                  </Dialog>

                  <Box textAlign={"center"}>
                    <Typography>
                      Or {isLogin ? "sign in" : "sign up"} with:
                    </Typography>

                    <IconButton onClick={signInWithGoogle} color="primary">
                      <GoogleIcon id="google" fontSize={"large"}></GoogleIcon>
                    </IconButton>
                  </Box>
                  {showError && (
                    <Alert
                      severity="error"
                      variant="filled"
                      sx={{ width: "50%", marginTop: 3 }}
                    >
                      {errorMessage}
                    </Alert>
                  )}
                  <Snackbar
                    open={showSnackBar}
                    onClose={() => setShowSnackBar(false)}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert
                      severity={snackBarMessage.severity}
                      variant="filled"
                      sx={{ width: "100%", marginTop: 3 }}
                    >
                      {snackBarMessage.message}
                    </Alert>
                  </Snackbar>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </section>
  );
};

export default AuthForm;
