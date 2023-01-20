import { useState , useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import classes from "./Login.css";
import { Button, Grid , TextField, Link, CssBaseline, Box, Container } from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import { auth, provider } from './firebaseConfig'
import { signInWithPopup, sendPasswordResetEmail  } from "firebase/auth";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef(); 
  const emailPassReset = useRef(); 
  const navigate = useNavigate();
  const authCtx = useContext (AuthContext); 
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    let url ; 
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPHJfNEGeaNbsPRkPbiKAG2B-7lAz_kIk';
    } else{
      url =  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPHJfNEGeaNbsPRkPbiKAG2B-7lAz_kIk'; 
    }
    fetch (url ,
      {
        method: 'POST',
        body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then ( res => {
        setIsLoading(false);
        if(res.ok) {
          return res.json();
        } else {
          return res.json ().then((data) => {
          let errorMessage = 'Auth failed';
        
          throw new Error( errorMessage);
          });
        }
      }).then( (data) => {
        console.log(data);
        authCtx.login(data.idToken);
        navigate('/');
      }).catch (err => {
        alert (err.message);
      });
  }

  const signInWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider).then((data) => {
      authCtx.login(data.user.uid);
      navigate('/');
      setIsLoading(false);
      // localStorage.clear();
    })
  }

  const passwordReset = async () => {
    // const email = prompt("Please enter you email: ")
    const email = emailPassReset.current.value;
    try {
      await sendPasswordResetEmail(auth, email)
      setIsShownModal(false);
      alert("Password reset sent to " + email)
    } catch(error) {
      alert("Password reset failed " + error)
    }

  }

  const showModal = () => {
    setIsShownModal(true);
  };

  const closeModal = () => {
    setIsShownModal(false);
  };

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler} id="loginForm">
        <div><h1>{isLogin ? 'Welcome Back!' : 'Welcome to Our Store'}</h1></div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
        <span>
        <TextField
          required
          id="outlined-input-email"
          label="Email"
          type="Email"
          autoComplete="current-password"
          inputRef = {emailInputRef}
        />
        </span>
        <span>
        <TextField
          required
          id="outlined-input-pass"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef = {passwordInputRef}
        />
        </span>
        <Grid item xs>
          <Link id="forPass" onClick={showModal} href="#" variant="body2">
          {isLogin ? 'Forgot password?' : ''}
          </Link>
          </Grid>
            <Dialog open={isShownModal} onClose={closeModal}>
            <DialogTitle>Password Reset</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email for reset password email:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                inputRef = {emailPassReset}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={passwordReset}>Send</Button>
            </DialogActions>
          </Dialog>
        <Button type="submit" variant="contained" id="signIn" endIcon={<SendIcon />}>
          {isLogin? 'LOG IN': 'SIGN IN'}
        </Button>
        
        {
          isLoading && <p> Loading ... </p>
        }
        <div class="text-center">
          
          <p>{isLogin ? 'Not a member?  ' : 'Already a member?  '} 
          <Link href="#!" onClick={switchAuthModeHandler}>{isLogin? 'Register' : 'Log In'}</Link></p>
          <p>or {isLogin ? 'log in': 'sign up'} with:</p>

          <GoogleIcon  id="google" size="small" fontSize="small" onClick={ signInWithGoogle } type="button" class="btn btn-link btn-floating mx-1">
            <i class="bi bi-google"></i>
          </GoogleIcon>
          
        </div>
        </Box>
      </Container>
      </form>
    </section>
  );
};

export default AuthForm;
