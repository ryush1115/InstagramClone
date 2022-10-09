import React, { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

const LoginComponent=()=>{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToProfile = () => {
    navigate('/user-profile');
  };

  const navigateToSignup = () => {
    navigate('/sign-up');
  };


 
    return (
    <div className = "auth-wrapper">
        <form className = "auth-inner">
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