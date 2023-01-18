import { useState , useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from "./Login.css";
import { Button, Grid , TextField, Link, FormControlLabel, Checkbox, CssBaseline, Box, 
  Container, Avatar, Typography } from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { auth, provider } from './firebaseConfig'
import { signInWithPopup } from "firebase/auth";


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef(); 
  const history = useHistory();
  const authCtx = useContext (AuthContext); 
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        }else{
          return res.json ().then((data) => {
          let errorMessage = 'Auth failed';
        
          throw new Error( errorMessage);
          });
        }
      }).then( (data) => {
        console.log(data);
        authCtx.login (data.idToken);
        history.replace('/');
      }).catch (err => {
        alert (err.message);
      });
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.clear();
    })
  }

  
  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler} id="loginForm">
        <div><h1>{isLogin ? 'Welcome Back!' : 'Welcome to OMA Bakery'}</h1></div>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link id="forPass" href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
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
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg> */}
          </GoogleIcon>
          
        </div>
        </Box>
      </Container>
      </form>
    </section>
  );
};

export default AuthForm;
