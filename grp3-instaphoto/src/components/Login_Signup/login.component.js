import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './login_signup.css';
import Form from './login_signup-components/form.component'
import Form_Submit from './login_signup-components/form-submit.component'
import Form_Welcome from './login_signup-components/form-welcome.component'
import {verifyUser} from '../../api/mock_api';

const LoginComponent=()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate('/sign-up');
  };

  const login = async (email, password) => {
    const data = await verifyUser(email, password);
    if (data.error) {
        alert(data.error);
    } else {
      localStorage.setItem('token', data.token);
      navigate('/user-profile');
    }
  }
  const validateEmail = (email) => {
  const regex =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      
    return regex.test(String(email).toLowerCase());
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      //setError('Invalid Email'); 
      console.log(email);
      console.log('Invalid Email');
      
    }

    if (password.length < 8) {
      //setError('Password must be at least 8 chars long');
      console.log('Password must be at least 8 chars long');
      
    }
    if (validateEmail(email) && password.length >= 8) {
      await login(email, password);
    }
  };

    // first do the validation in the front end
    // have a wrapper function to call to encapsulate the two function (1. validate email format/pw lenght)
    // &. 2. check if email is in database
    // try to get a certain based on email key, if get an error then user does not exist, direct to sign up

    // to transition from 1 page to another, use a hook called useNavigate

    return (
      <form className = "auth-inner">
        <Form_Welcome/>
        <Form label = "Email" type = "email" placeholder = "Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
        <Form label = "Password" type="password" placeholder = "Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Form_Submit label = "Sign in" onClick={(e) => handleSubmitClick(e)}/>

        <p className="login-create-account text-right">
          Don't have an account? <br></br>
          <a href="#" onClick={navigateToSignup}> Sign up now to join communities across the globe </a>
        </p>
      </form>

    )
}

export default LoginComponent;
