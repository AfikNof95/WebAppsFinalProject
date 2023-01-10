import { useState , useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from "./Login.css";
import 'bootstrap/dist/css/bootstrap.css';
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

  
  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler} id="loginForm">
        <div><h1>{isLogin ? 'Welcome Back!' : 'Welcome to OMA Bakery'}</h1></div>
        <div class="form-outline mb-4">
          <input type="email" id="email" class="form-control" placeholder="Email" required ref = {emailInputRef}/>
          <label class="form-label" for="loginName"></label>
          <input type="password" id="pass" class="form-control" placeholder="Password" minLength = "6" required ref = {passwordInputRef} />
          <label class="form-label" for="form2Example2"></label>
        </div>
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="RememberMe">Remember me </label>
              <input class="form-check-input" type="checkbox" value="" id="RememberMe" checked />
            </div>
            <a id="forPass" href="#!">{isLogin ? 'Forgot password?': ''}</a>
          </div>
        </div>
        <button type="submit" id="signIn" class="btn btn-primary btn-block mb-4">
          {isLogin? 'LOG IN': 'SIGN IN'}
        </button>
        {
          isLoading && <p> Loading ... </p>
        }
        <div class="text-center">
          
          <p>{isLogin ? 'Not a member?  ' : 'Already a member?  '} 
          <a href="#!" onClick={switchAuthModeHandler}>{isLogin? 'Register' : 'Log In'}</a></p>
          <p>or {isLogin ? 'log in': 'sign up'} with:</p>
          
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
