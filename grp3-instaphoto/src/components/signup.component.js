import React, { useState } from "react";

const SignupComponent=()=>{

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, email, password, confirmPassword);
  };


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
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="login-and-password">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="login-and-password">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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