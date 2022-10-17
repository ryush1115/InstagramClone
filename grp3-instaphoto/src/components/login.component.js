import React, { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// import API functions
import { getUsers, getUser, createUser } from '../api/mock_api';

const LoginComponent=()=>{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToProfile = () => {
    navigate('/userprofile');
  };

  const navigateToSignup = () => {
    navigate('/sign-up');
  };

  const [error, setError] = useState(null);
  const [state, setState] = useState({
    email:'',
    password:'',
  });

  // handle changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // validate email
  const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(state.email)) {
      setError('Invalid Email');
      console.log('Invalid Email');
    }

    if (state.password.length < 8) {
      setError('Password must be at least 8 chars long');
      console.log('Password must be at least 8 chars long');
    }
    if (!error) {
      // No errors.
    }
    }

    return (
    <div className = "auth-wrapper">
        // Added onSubmit = {handleSubmit}
        <form className = "auth-inner" onSubmit = {handleSubmit}>
        <div className="header">
            <h3>Welcome to Instaphoto&nbsp;</h3>
            <img src={require('../images/logo.PNG')} alt="logo" />
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
          <button type="submit" className="btn btn-primary" onClick={navigateToProfile}>
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
