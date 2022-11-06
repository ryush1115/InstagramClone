import React, { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// import API functions
import { getUser, createUser } from '../api/mock_api';

const LoginComponent=()=>{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const navigateToProfile = () => {
  //   navigate('/userprofile');
  // };

  const navigateToSignup = () => {
    navigate('/sign-up');
  };


  // 1. *** Don't do this for HW2 *** read the json database first
  // 2. Check whether the email values are in the database by calling API with specific ID
  //    a. if not, then sign up
  //    b. *** Don't do this for HW2*** if yes, check password ! NO NEED TO CHECK THIS! Not safe to check password in the front
  //        *** i. if no, warn user
  //        *** ii if yes, go to c
  //    c. sign in button to create a new page -> fetch from backend and present them to frontend
  //      the page should have a framework, and each framework should have variables to be submitted based on user's data

  // validate email
  const validateEmail = (email) => {
  const regex =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      
    return regex.test(String(email).toLowerCase());
  };

  // asynchronous function
  // how to encapsulate two function (1. asynch, 2. sync) into another function
  // const checkEmailInDB = () > {
  // }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      //setError('Invalid Email'); 
      console.log('Invalid Email');
      
    }

    if (password.length < 8) {
      //setError('Password must be at least 8 chars long');
      console.log('Password must be at least 8 chars long');
      
    }
    if (validateEmail(email) && password.length >= 8) {
      console.log("valid email and password");
      
      // check if the email is in the database?
      //if(email) exists in the backend?

      navigate('/userprofile');

      // if useNavigate to navigate to a page. then the page will re-render
      // if have useEffect with no parameter, then that will re-render
    }
    }

    // first do the validation in the front end
    // have a wrapper function to call to encapsulate the two function (1. validate email format/pw lenght)
    // &. 2. check if email is in database
    // try to get a certain based on email key, if get an error then user does not exist, direct to sign up

    // to transition from 1 page to another, use a hook called useNavigate

    return (
    <div className = "auth-wrapper">
        <form className = "auth-inner">
        <div className="header">
            <h3>Welcome to Instaphoto&nbsp;</h3>
            <img src="https://i.ibb.co/VV3Xdf1/logo.png" alt="logo" />
        </div>
        <br></br>
        <div className="login-and-password">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <p>Forgot password?</p>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitClick(e)}>
            Sign in
          </button>
        </div>
        <p className="login-create-account text-right">
          Don't have an account? <br></br>
          <a href="#" onClick={navigateToSignup}> Sign up now to join communities across the globe </a>
        </p>
      </form>
    </div>

    )
}

export default LoginComponent;
