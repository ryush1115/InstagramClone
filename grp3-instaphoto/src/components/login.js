import React, { useState } from "react";

const LoginComponent=()=>{

 
    return (
        <form>
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
          />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <p>Forgot password?</p>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
        <p className="login-create-account text-right">
          Don't have an account? <br></br>
          <a href="#"> Sign up now to join communities across the globe </a>
        </p>
      </form>
 
    )
} 
 
 
export default LoginComponent;