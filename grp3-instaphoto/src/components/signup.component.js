import React, { useState } from "react";

const SignupComponent=()=>{
    return (
      <form className = "auth-inner">
        <div className="header">
            <h3>Welcome to Instaphoto&nbsp;</h3>
            <img src={require('../images/logo.PNG')} alt="logo" />
        </div>
        <br></br>
        <div className = "login-and-password">
            <h3> Signup</h3>
        </div>
        <div className="login-and-password">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="login-and-password">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="login-and-password">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Finish
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )

}

 
export default SignupComponent;